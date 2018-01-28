const {Activity} = require(`mongoose`).models;
const jwt = require(`jsonwebtoken`);
const {omit, pick, isEmpty} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [
  {

    method: `GET`,
    path: `${base}/activities`,

    config: {

      validate: {

        options: {
          abortEarly: false,
          allowUnknown: true
        },
        query: {
          id: Joi.string(),
          username: Joi.string(),
          title: Joi.string(),
          type: Joi.string().min(1).max(1),
          isActive: Joi.bool()
        },

        headers: {
          authorization: Joi.string().required()
        }
      }

    },

    handler: (req, res) => {
      // Validate token
      const {authorization} = req.headers;
      const token = jwt.decode(authorization);
      if (!token) return res(Boom.badRequest(`No authorization header`));

      // Generate conditions
      const conditions = {};
      const q = pick(req.query, [`id`, `username`, `type`, `title`, `isActive`]);

      //id
      if (!isEmpty(q.id)) conditions._id = q.id;
      //username
      if (!isEmpty(q.username)) conditions.username = new RegExp(`^${q.username}$`, `i`);
      //type
      if (!isEmpty(q.type)) conditions.type = new RegExp(`^${q.type}$`, `i`);
      //title
      if (!isEmpty(q.title)) conditions.title = new RegExp(q.title, `i`);
      //isActive
      conditions.isActive = !q.isActive && String(q.isActive) !== `undefined` ? false : true;

      Activity.find(isEmpty(conditions) ? `` : conditions).sort({created: `desc`})
          .then(activities => {
            return isEmpty(activities) ? res(Boom.notFound()) : res(activities);
          })
          .catch(() => res(Boom.badRequest()));
    }
  },

  {

    method: `POST`,
    path: `${base}/activities`,

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
          type: Joi.string().min(1).max(1).required(),
          title: Joi.string().min(3).max(128).required(),
          description: Joi.string().min(3).required(),
        }

      }

    },

    handler: (req, res) => {
      // Validate token
      const {authorization} = req.headers;
      const token = jwt.decode(authorization);
      if (!token) return res(Boom.badRequest(`No authorization header`));

      // Get data
      const {username} = token;
      const {type, title, description} = req.payload;
      // Bind data
      const data = {username, type, title, description};

      // Create new Activity
      const activity = new Activity(data);
      // Save new activity
      activity.save()
        .then(a => {
          if (!a) return res(Boom.badRequest(`cannot save activity`));
          return res(omit(a.toJSON(), [`__v`, `modified`]));
        })
        .catch(e => {
          console.log(e);
          return res(Boom.badRequest(`cannot save activity`));
        });
    }
  },

  {

    method: `PUT`,
    path: `${base}/activities/{_action?}`,

    config: {

      validate: {

        options: {
          abortEarly: false,
          allowUnknown: true
        },

        headers: {
          authorization: Joi.string().required()
        },

        params: {
          _action: Joi.string().min(2)
        },

        query: {
          id: Joi.string().required(),
        },

        payload: {
          comment: Joi.string(),
          doneby: Joi.string()
        }
      }

    },

    handler: (req, res) => {
      // Validate token
      const {authorization} = req.headers;
      const token = jwt.decode(authorization);
      if (!token) return res(Boom.badRequest(`No authorization header`));

      const {paid} = req.payload;
      const {_action} = req.params;
      const {id: _id} = req.query;

      const data = {};
      let insert = {};


      switch (_action) {
      case `comment`:
        data[`comments`] = addcomment(req, res);
        insert = {$push: data};
        break;
      case `paid`:
        data[`paid`] = setpaid(req, res);
        data[`isActive`] = (paid === `true`) ? false : true;
        insert = {$set: data};
        break;
      case `doneby`:
        data[`doneBy`] = setDoneBy(req, res);
        insert = {$set: data};
        break;
      default:
        return res(Boom.badRequest(`No valid function found.`));
      }

      Activity.findOneAndUpdate({_id}, insert, {new: true})
        .then(activity => {
          return res(activity);
        })
        .catch(err => {
          console.log(err);
          return res(err);
        });
    }
  },

];

const addcomment = (req, res) => {
  const {comment} = req.payload;
  if (!comment) return res(Boom.badRequest(`No comment in payload`));

  const data = JSON.parse(comment);
  const error = validateObject(data, [`username`, `account`, `description`, `date`]);
  if (!isEmpty(error)) return res(error).code(400);
  return data;
};

const setpaid = (req, res) => {
  const {paid} = req.payload;
  if (paid === undefined) return res(Boom.badRequest(`No paid in payload`));
  return paid;
};

const setDoneBy = (req, res) => {
  const {doneby} = req.payload;
  if (!doneby) return res(Boom.badRequest(`No doneby in payload`));

  const data = JSON.parse(doneby);
  const error = validateObject(data, [`username`, `account`]);
  if (!isEmpty(error)) return res(error).code(400);
  return data;
};

const validateObject = (obj, key) => {
  const error = {};
  key.map(k => !obj.hasOwnProperty(k) ? error[k] = `please add a ${k}` : ``);
  return error;
};
