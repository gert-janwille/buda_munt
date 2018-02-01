const {Dealer} = require(`mongoose`).models;
const jwt = require(`jsonwebtoken`);
const {omit, pick, isEmpty} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [
  {

    method: `GET`,
    path: `${base}/dealers`,

    config: {

      validate: {

        options: {
          abortEarly: false,
          allowUnknown: true
        },
        query: {
          id: Joi.string(),
          name: Joi.string(),
          isActive: Joi.bool()
        }
      }

    },

    handler: (req, res) => {
      // Generate conditions
      const conditions = {};
      const q = pick(req.query, [`id`, `name`, `type`, `isActive`]);

      //id
      if (!isEmpty(q.id)) conditions._id = q.id;
      //name
      if (!isEmpty(q.name)) conditions.name = new RegExp(`^${q.name}$`, `i`);
      //isActive
      conditions.isActive = !q.isActive && String(q.isActive) !== `undefined` ? false : true;

      Dealer.find(isEmpty(conditions) ? `` : conditions).sort({created: `desc`})
          .then(dealers => {
            return isEmpty(dealers) ? res(Boom.notFound()) : res(dealers);
          })
          .catch(() => res(Boom.badRequest()));
    }
  },

  {

    method: `POST`,
    path: `${base}/dealers`,

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
          account: Joi.string().required(),
          description: Joi.string().min(3).required(),
          name: Joi.string().required()
        }

      }

    },

    handler: (req, res) => {
      // Validate token
      const {authorization} = req.headers;
      const token = jwt.decode(authorization);
      if (!token) return res(Boom.badRequest(`No authorization header`));

      // Get data
      const {name, description, account} = req.payload;
      // Bind data
      const data = {name, description, account};

      // Create new Dealer
      const dealer = new Dealer(data);
      // Save new dealer
      dealer.save()
        .then(a => {
          if (!a) return res(Boom.badRequest(`cannot save dealer`));
          return res(omit(a.toJSON(), [`__v`, `modified`]));
        })
        .catch(e => {
          console.log(e);
          return res(Boom.badRequest(`cannot save dealer`));
        });
    }
  }
];
