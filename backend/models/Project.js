const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true }, // fullstack, datascience, ai
  icon: { type: String },
  description: { type: String, required: true },
  features: [{ type: String }],
  technologies: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
