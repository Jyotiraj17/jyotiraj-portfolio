const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleTitles: [{ type: String }],
  heroTagline: { type: String },
  summary: { type: String },
  location: { type: String },
  phone: { type: String },
  email: { type: String },
  linkedin: { type: String },
  github: { type: String },
  resumeUrl: { type: String },
  photo: { type: String },
  stats: {
    projectsCompleted: { type: String },
    internships: { type: String },
    certifications: { type: String },
    currentCgpa: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
