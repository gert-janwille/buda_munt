const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  account: {
    type: String,
    required: true
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

module.exports = {schema};
