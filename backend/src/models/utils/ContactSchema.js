const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  }
})

module.exports = ContactSchema
