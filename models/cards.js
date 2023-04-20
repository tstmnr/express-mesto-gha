const mongoose = require('mongoose');

const cardSchema = new mongoose.SchemaType({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30
  },

  link: {
    type: String,
    require: true
  },

  owner: {
    objectId: []
  },

  likes: {
    type: Array,
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('card', cardSchema);