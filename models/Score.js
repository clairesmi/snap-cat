const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 15 },
  time: { type: String, required: true },
  seconds: { type: Number, required: true },
}, {
  timestamps: true,
});

scoreSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Score', scoreSchema);
