const Certification = require('../models/Certification');
const defaultData = require('../data/defaultData');
const { getDBStatus } = require('../config/db');

exports.getCertifications = async (req, res) => {
  try {
    if (getDBStatus()) {
      const certifications = await Certification.find({});
      if (certifications && certifications.length > 0) return res.json({ success: true, count: certifications.length, data: certifications });
    }
    return res.json({ success: true, count: defaultData.certifications.length, data: defaultData.certifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultData.certifications });
  }
};
