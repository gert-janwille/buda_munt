const Schema = require(`mongoose`).Schema;

const schema = new Schema({

  username: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  categorie: {
    type: String,
    required: true
  },

  comments: {
    type: Array,
    default: []
  },

  price: {
    type: Number,
    required: true
  },

  hasInterest: {
    type: Array,
    default: []
  },

  doneBy: {
    type: Object,
    default: {}
  },

  paid: {
    type: Boolean,
    default: false
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
