const QRCode = require(`qrcode`);
const {User} = require(`mongoose`).models;
const {Account} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);
const {SECRET: secret} = process.env;

const Joi = require(`joi`);
const Boom = require(`boom`);
const mail = require(`../../lib/mail`);

const base = `/api`;

module.exports = [

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
          username: Joi.string().min(3).required(),
          email: Joi.string().email().required(),
          phone: Joi.string().required(),
          password: Joi.string().min(3).required(),
          pin: Joi.string().min(4).max(4).required(),
          isActive: Joi.boolean(),
          scope: Joi.string().min(3)
        }

      }

    },

    handler: (req, res) => {

      let fields = [`username`, `email`, `phone`, `password`, `pin`];

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
                  account = omit(account.toJSON(), [`__v`, `_id`, `modified`, `created`, `isActive`]);
                  u = omit(u.toJSON(), [`__v`, `account`, `password`, `modified`]);

                  // Prepare data for email
                  u.subject = `Thank you for the registration!`;
                  u.mailtype = `register`;
                  u.account = account;

                  // Send email & remove mail types
                  mail(u, u.email);
                  u = omit(u, [`subject`, `mailtype`]);

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
