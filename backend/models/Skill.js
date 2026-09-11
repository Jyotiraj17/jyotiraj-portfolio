const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true }, // languages, web, dataScience, databases, tools
  title: { type: String, required: true },
  items: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
