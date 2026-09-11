const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String, required: true },
  badge: { type: String },
  url: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Certification', CertificationSchema);
