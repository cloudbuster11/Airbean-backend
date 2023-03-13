const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const models = {};

models.mongoose = mongoose;

models.User = require('./userModel');
models.OrderUser = require('./orderUserModel');
models.OrderGuest = require('./orderGuestModel');
models.Product = require('./productModel');

models.ROLESSTRING = ['user', 'admin'];

module.exports = models;
