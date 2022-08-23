const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: {type: String, required: true, unique: true},
  isAdmin: { type: Boolean, required: true },
})

module.exports = model('Users', schema, 'Users')
