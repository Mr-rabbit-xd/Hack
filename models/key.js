const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  used: { type: Boolean, default: false },
  usedBy: { type: String, default: null },
  createdBy: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Key', keySchema);
