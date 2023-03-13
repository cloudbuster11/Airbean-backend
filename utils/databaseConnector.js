const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
    })
    .catch((err) => {
      console.error('Connection error', err);
      process.exit();
    });
}

module.exports = connectToDb;
