const fs = require(`fs`);
const jwt = require(`jsonwebtoken`);
const QRCode = require(`qrcode`);
const {User} = require(`mongoose`).models;
const {Account} = require(`mongoose`).models;
const {Dealer} = require(`mongoose`).models;

const {pick, omit, isEmpty} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);
const {SECRET: secret} = process.env;

const Joi = require(`joi`);
const Boom = require(`boom`);
const mail = require(`../../lib/mail`);

const base = `/api`;

module.exports = [
  {

    method: `GET`,
    path: `${base}/users`,

    config: {

      validate: {

        options: {
          abortEarly: false,
          allowUnknown: true
        },
        query: {
          email: Joi.string(),
          username: Joi.string()
        }
      }

    },

    handler: (req, res) => {
      const {authorization} = req.headers;
      const token = jwt.decode(authorization);
      if (!token) return res(Boom.badRequest(`No authorization header`));

      const {email, username} = req.query;

      if (username !== undefined) {

        User.findOne({username})
          .then(({email}) => {
            if (!email) return res(Boom.badRequest(`error while getting email`));
            return res({email: email});
          })
          .catch(() => {
            return res(Boom.badRequest(`error while authenticating user`));
          });

      } else {
        User.findOne({email})
          .then(user => {
            if (token.email !== email) return res(Boom.unauthorized(`You're unauthorized to get this user`));
            getAccount(user, res);
          })
          .catch(() => {
            return res(Boom.badRequest(`error while authenticating user`));
          });
      }

    }
  },

  {

    method: `POST`,
    path: `${base}/users`,

    config: {


      auth: {
        strategy: `token`,
        mode: `try` /* mode: optional, same as try, but fails on invalid token */
      },

      validate: {

        options: {
          abortEarly: false
        },

        payload: {
          output: `stream`,
          parse: true,
          allow: `multipart/form-data`,
          username: Joi.string().min(3).required(),
          email: Joi.string().email().required(),
          phone: Joi.string().required(),
          password: Joi.string().min(3).required(),
          pin: Joi.string().min(4).max(4).required(),
          isActive: Joi.boolean(),
          scope: Joi.string().min(3),
          file: Joi.any(),
          dealer: Joi.string(),
          description: Joi.string(),
          name: Joi.string().required(),
          firstName: Joi.string().required(),
          street: Joi.string().required(),
          houseNumber: Joi.string().required(),
          bus: Joi.string(),
          zip: Joi.string().required(),
        }

      }

    },

    handler: (req, res) => {

      let fields = [`username`, `email`, `phone`, `password`, `pin`,
        `file`, `dealer`, `description`, `name`, `firstName`, `street`,
        `houseNumber`, `bus`, `zip`];

      if (req.payload.scope === Scopes.ADMIN) {
        fields = [...fields, `isActive`, `scope`];
      }

      const data = pick(req.payload, fields);

      // Generate personal BDA account
      data[`account`] = generateAccount(data);

      // Request QR code and save
      const keyData = {
        account: data[`account`],
        secret: secret
      };

      // Encode the String
      const encodedString = new Buffer(JSON.stringify(keyData)).toString(`base64`);
      // Request QR data uri
      QRCode.toDataURL(encodedString)
        .then(url => data[`qr`] = url)
        .then(() => {
          const user = new User(data);

          // Save user
          user.save()
            .then(u => {
              if (!u) return res(Boom.badRequest(`cannot save user`));
              // Save the account
              const account = new Account({account: u.account, pin: data.pin});

              account.save()
                .then(account => {
                  if (!account) return res(Boom.badRequest(`cannot create account`));
                  account = omit(account.toJSON(), [`__v`, `_id`, `pin`, `modified`, `created`, `isActive`]);
                  u = omit(u.toJSON(), [`__v`, `account`, `password`, `modified`]);

                  // Prepare data for email
                  u.subject = `Thank you for the registration!`;
                  u.mailtype = `register`;
                  u.account = account;

                  if (data.dealer && data.description) {
                    const dealer = new Dealer({name: data.dealer, description: data.description, account: data.account});

                    dealer.save()
                      .then(dealer => {
                        if (!dealer) return res(Boom.badRequest(`cannot create dealer`));
                      });
                  }

                    // Send email & remove mail types
                  mail(u, u.email);
                  u = omit(u, [`subject`, `mailtype`]);

                    // Save image
                  if (data.file) {
                    const prefix = `./server/uploads/`;
                    const filename = `${data.username.toLowerCase().split(` `).join(`-`)}.jpg`;
                    fs.writeFile(prefix + filename, data.file, `binary`, err => {
                      if (err) return res(Boom.badRequest(`Error while saving picture`));
                    });
                  }

                  return res(u);
                })
                .catch(() => res(Boom.badRequest(`cannot create account`)));

            })
            .catch(e => {
              console.log(e);
              res(Boom.badRequest(`cannot create account`));
            });

        })
        .catch(e => {
          console.log(e);
          res(Boom.badRequest(`cannot create account`));
        });
    }
  }
];


const generateAccount = data => {
  const u = data[`username`].charAt(0).toUpperCase();
  const e = data[`email`].charAt(0).toUpperCase();

  let acc = `BDA-`;
  for (let i = 0;i <= 6;i ++) {
    acc += Math.floor(Math.random() * 10);
    if (i % 3 === 1)acc += `-`;
  }
  acc += `-${u}${e}`;
  return acc;
};

const getAccount = (user, res) => {
  const {account} = user;
  Account.findOne({account})
    .then(account => {
      if (isEmpty(account)) return res(Boom.notFound());
      account = omit(account.toJSON(), [`__v`, `_id`, `pin`, `modified`, `created`, `isActive`]);
      return res({user, account});
    })
    .catch(() => {
      return res(Boom.badRequest(`error while authenticating user`));
    });
};
