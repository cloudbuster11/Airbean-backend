const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
const db = require('./models/index');
const Role = db.role;
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

async function initial() {
  const collectionCount = await Role.estimatedDocumentCount();
  if (collectionCount === 0) {
    const user = new Role({ name: 'user' });
    const admin = new Role({ name: 'admin' });
    admin.save();
    user.save();
  }
}

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: 'user',
//       }).save((err) => {
//         if (err) {
//           console.log('error', err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: 'moderator',
//       }).save((err) => {
//         if (err) {
//           console.log('error', err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: 'admin',
//       }).save((err) => {
//         if (err) {
//           console.log('error', err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
