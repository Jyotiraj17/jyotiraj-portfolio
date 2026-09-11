const Experience = require('../models/Experience');
const defaultData = require('../data/defaultData');
const { getDBStatus } = require('../config/db');

exports.getExperience = async (req, res) => {
  try {
    if (getDBStatus()) {
      const experience = await Experience.find({});
      if (experience && experience.length > 0) return res.json({ success: true, count: experience.length, data: experience });
    }
    return res.json({ success: true, count: defaultData.experience.length, data: defaultData.experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultData.experience });
  }
};
