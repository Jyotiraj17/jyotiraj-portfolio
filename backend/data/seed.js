/**
 * MongoDB Atlas Database Seed Script
 * Run with: npm run seed
 */

require('dotenv').config();
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

const Profile = require('../models/Profile');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certification = require('../models/Certification');
const defaultData = require('./defaultData');

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not set in .env. Please set it before running seed.');
    process.exit(1);
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connected. Clearing existing collections...');

    await Promise.all([
      Profile.deleteMany({}),
      Education.deleteMany({}),
      Experience.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Certification.deleteMany({})
    ]);

    console.log('🌱 Seeding fresh data from portfolio details...');

    await Profile.create(defaultData.profile);
    await Education.insertMany(defaultData.education);
    await Experience.insertMany(defaultData.experience);
    await Project.insertMany(defaultData.projects);
    await Skill.insertMany(defaultData.skills);
    await Certification.insertMany(defaultData.certifications);

    console.log('🎉 Successfully seeded all collections:');
    console.log(` - 1 Profile`);
    console.log(` - ${defaultData.education.length} Education records`);
    console.log(` - ${defaultData.experience.length} Experience entries`);
    console.log(` - ${defaultData.projects.length} Projects`);
    console.log(` - ${defaultData.skills.length} Skill categories`);
    console.log(` - ${defaultData.certifications.length} Certifications`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB. Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
