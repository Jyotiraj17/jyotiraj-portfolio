const Profile = require('../models/Profile');
const defaultData = require('../data/defaultData');
const { getDBStatus } = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    if (getDBStatus()) {
      const profile = await Profile.findOne({});
      if (profile) return res.json({ success: true, data: profile });
    }
    return res.json({ success: true, data: defaultData.profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultData.profile });
  }
};
