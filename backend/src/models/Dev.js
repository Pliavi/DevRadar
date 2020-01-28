const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')
const ContactSchema = require('./utils/ContactSchema')

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  contact_accounts: [ ContactSchema ],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
})

module.exports = mongoose.model('Dev', DevSchema)