const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  likes: {
    type: mongoose.Schema.Types.Array,
    ref: 'user',
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('card', cardSchema);