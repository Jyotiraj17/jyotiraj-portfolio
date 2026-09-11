const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  score: { type: String, required: true },
  location: { type: String },
  coursework: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
