const QRCode = require(`qrcode`);
const {User} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

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
          isActive: Joi.boolean(),
          scope: Joi.string().min(3)
        }

      }

    },

    handler: (req, res) => {

      let fields = [`username`, `email`, `phone`, `password`];

      if (req.payload.scope === Scopes.ADMIN) {
        fields = [...fields, `isActive`, `scope`];
      }

      const data = pick(req.payload, fields);

      // Generate personal BDA account
      data[`account`] = generateAccount(data);

      // Request QR code and save
      QRCode.toDataURL(data[`account`])
        .then(url => data[`qr`] = url)
        .then(() => {
          const user = new User(data);

          user.save()
            .then(u => {
              // Prepare data for email
              u.subject = `Thank you for the registration!`;
              u.mailtype = `register`;
              mail(u, u.email);

              // Save user
              if (!u) return res(Boom.badRequest(`cannot save user`));
              u = omit(u.toJSON(), [`__v`, `password`, `isActive`]);
              return res(u);
            })
            .catch(err => res(err));

        })
        .catch(err => {
          console.error(err);
        });
    }
  }
];

const generateAccount = data => {
  const u = data[`username`].charAt(0).toUpperCase();
  const e = data[`email`].charAt(0).toUpperCase();

  let acc = `BDA-`;
  for (let i = 0;i <= 8;i ++) {
    acc += Math.floor(Math.random() * 10);
    if (i % 3 === 1)acc += `-`;
  }
  acc += `-${u}${e}`;
  return acc;
};
