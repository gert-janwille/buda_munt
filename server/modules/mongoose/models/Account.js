const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  account: {
    type: String,
    required: true
  },

  pin: {
    type: String,
    required: true,
    bcrypt: true
  },

  balance: {
    type: Number,
    default: 0
  },

  spent: {
    type: String,
    default: 0
  },

  transactions: {
    type: Array,
    default: []
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
