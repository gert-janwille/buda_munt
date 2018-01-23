const {Account} = require(`mongoose`).models;
const jwt = require(`jsonwebtoken`);
const {pick, omit, isEmpty} = require(`lodash`);
const {SECRET: secret} = process.env;

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {

    method: `PUT`,
    path: `${base}/accounts/{_action}/{_amount}`,

    config: {

      validate: {

        options: {
          abortEarly: false,
          allowUnknown: true
        },

        headers: {
          authorization: Joi.string().required()
        },

        payload: {
          hash: Joi.string().min(3).required(),
          pin: Joi.string().min(4).max(4).required(),
        },

        params: {
          _action: Joi.string().min(2).required(),
          _amount: Joi.number().required()
        }

      }

    },

    handler: (req, res) => {
      const {_action, _amount} = req.params;
      const {hash, pin} = req.payload;

      const {authorization} = req.headers;
      const token = jwt.decode(authorization);
      if (!token) return res(Boom.badRequest(`No authorization header`));

      try {
        // Decode the String
        const qr = JSON.parse(new Buffer(hash, `base64`).toString(`ascii`));

        // Validation
        if (qr.secret !== secret) return res(Boom.badRequest(`Invalid QR code`));
        if (token.account === qr.account) return res(Boom.badRequest(`Same card`));
        if (![`receive`, `sent`].includes(_action)) return res(Boom.badRequest(`Invalid action`));

        let accountWithPin, otherAccount;
        if (_action === `receive`) {
          accountWithPin = qr;
          otherAccount = token;
        } else if (_action === `sent`) {
          accountWithPin = token;
          otherAccount = qr;
        }

        switch (_action) {
        case `receive`:
          accountWithPin = qr;
          otherAccount = token;
          break;
        case `sent`:
          accountWithPin = token;
          otherAccount = qr;
          break;
        }

        const transactionOther = `Received ${_amount} from ${accountWithPin.account}`;
        const transactionPayer = `Sented ${_amount} to ${otherAccount.account}`;

        // Get payers account
        Account.findOne({account: accountWithPin.account})
          .then(account => {

            // Verify Payers Pin
            account.verifyPin(pin, (err, isValid) => {
              if (err || !isValid) return res(Boom.badRequest(`Pin incorrect`));

              // Remove from Payers balance
              removeAmount(accountWithPin, _amount, transactionPayer)
                .then(payer => {
                  if (!isEmpty(payer.error)) return res(Boom.badRequest(payer.error));
                  payer = omit(payer.toJSON(), [`__v`, `pin`, `created`, `modified`]);

                  // Add to Receivers balance
                  addAmount(otherAccount, _amount, transactionOther)
                    .then(receiver => {
                      receiver = omit(receiver.toJSON(), [`__v`, `pin`, `created`, `modified`]);

                      // Always return data of Device
                      switch (_action) {
                      case `receive`:
                        return res(receiver);
                      case `sent`:
                        return res(payer);
                      }
                    });
                })

                .catch(e => {
                  console.log(`err`, e);
                  return res(Boom.badRequest(`Something went wrong. Try again`));
                });
            });
          });

      } catch (e) {
        console.log(e);
        res(Boom.badRequest(`Invalid QR code`));
      }
    }
  }
];


const removeAmount = (account, amout, transaction) => {
  return Account.findOneAndUpdate(
    {
      account: account.account,
      balance: {$gte: amout}
    },
    {
      $inc: {balance: - amout},
      $push: {transactions: transaction}
    }, {new: true})

  .then(account => {
    if (!account) return {error: `Payer has not enough BDA on the account`};
    return account;
  });
};

const addAmount = (account, amount, transaction) => {
  return Account.findOneAndUpdate(
    {
      account: account.account
    },
    {
      $inc: {balance: + amount},
      $push: {transactions: transaction}
    }, {new: true})

  .then(account => {
    if (!account) return {error: `Account not found`};
    return account;
  });
};
