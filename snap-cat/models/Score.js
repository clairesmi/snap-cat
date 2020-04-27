const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20 },
  time: { type: String, required: true },
} , {
  timestamps: true
})

scoreSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Score', scoreSchema)