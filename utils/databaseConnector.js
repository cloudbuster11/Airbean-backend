const mongoose = require('mongoose');
const dotenv = require('dotenv');

const models = require('../models');
const Role = models.role;

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_SERVER, DATABASE_CONNECTION } = process.env;

function connectToDb() {
  const DB_URL = `${DATABASE_CONNECTION}${DATABASE_USER}:${DATABASE_PASSWORD}${DATABASE_SERVER}`;
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connection successful');
      initializeRoles();
    })
    .catch((err) => {
      console.error('Connection error', err);
      process.exit();
    });
}

async function initializeRoles() {
  const collectionCount = await Role.estimatedDocumentCount();
  if (collectionCount === 0) {
    const user = new Role({ name: 'user' });
    const admin = new Role({ name: 'admin' });
    admin.save();
    user.save();
  }
}

module.exports = connectToDb;
