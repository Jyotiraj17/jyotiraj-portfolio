const Project = require('../models/Project');
const defaultData = require('../data/defaultData');
const { getDBStatus } = require('../config/db');

exports.getProjects = async (req, res) => {
  try {
    const { category } = req.query;

    if (getDBStatus()) {
      const filter = category && category !== 'all' ? { category } : {};
      const projects = await Project.find(filter);
      if (projects && projects.length > 0) return res.json({ success: true, count: projects.length, data: projects });
    }

    const projects = category && category !== 'all'
      ? defaultData.projects.filter(p => p.category === category)
      : defaultData.projects;

    return res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: defaultData.projects });
  }
};
