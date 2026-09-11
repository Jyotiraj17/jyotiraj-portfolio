const Skill = require('../models/Skill');
const defaultData = require('../data/defaultData');
const { getDBStatus } = require('../config/db');

exports.getSkills = async (req, res) => {
  try {
    if (getDBStatus()) {
      const skills = await Skill.find({});
      if (skills && skills.length > 0) return res.json({ success: true, count: skills.length, data: skills });
    }
    return res.json({ success: true, count: defaultData.skills.length, data: defaultData.skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultData.skills });
  }
};
