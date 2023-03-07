const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
  // orderUser: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'OrderUser',
  // },
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
