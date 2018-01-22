const {User} = require(`mongoose`).models;

const {pick, omit} = require(`lodash`);

const Scopes = require(`../../modules/mongoose/const/Scopes`);

const Joi = require(`joi`);
const Boom = require(`boom`);

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
      const user = new User(data);

      user.save()
        .then(u => {
          if (!u) return res(Boom.badRequest(`cannot save user`));
          u = omit(u.toJSON(), [`__v`, `password`, `isActive`]);
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save user`)));

    }

  }

];
