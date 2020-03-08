const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  sid: { type: String, required: true },
  name: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: String, required: true }
})

module.exports = model('User', userSchema)
