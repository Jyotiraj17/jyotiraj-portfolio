const Education = require('../models/Education');
const defaultData = require('../data/defaultData');
const { getDBStatus } = require('../config/db');

exports.getEducation = async (req, res) => {
  try {
    if (getDBStatus()) {
      const education = await Education.find({});
      if (education && education.length > 0) return res.json({ success: true, count: education.length, data: education });
    }
    return res.json({ success: true, count: defaultData.education.length, data: defaultData.education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultData.education });
  }
};
