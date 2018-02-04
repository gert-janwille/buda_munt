const Schema = require(`mongoose`).Schema;

const Scopes = require(`../const/Scopes`);

const schema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
    bcrypt: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  account: {
    type: String,
    required: true,
    unique: true
  },

  qr: {
    type: String,
    required: true,
    unique: true
  },

  street: {
    type: String,
    required: true
  },

  houseNumber: {
    type: String,
    required: true
  },

  bus: {
    type: String
  },

  zip: {
    type: String,
    required: true
  },

  dealer: {
    type: String
  },

  description: {
    type: String
  },

  scope: {
    type: String,
    default: Scopes.USER
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, {

  timestamps: {
    createdAt: `created`,
    updatedAt: `modified`
  }

});

schema.plugin(require(`mongoose-bcrypt`));

module.exports = {schema};
