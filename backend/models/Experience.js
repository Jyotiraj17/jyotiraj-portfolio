const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  organization: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String },
  type: { type: String },
  description: { type: String, required: true },
  technologies: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
