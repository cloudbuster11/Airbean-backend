const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const models = {};

models.mongoose = mongoose;

models.user = require('./userModel');
models.role = require('./roleModel');
models.orderUser = require('./orderUserModel');
models.orderGuest = require('./orderGuestModel');
models.product = require('./productModel');

models.ROLES = ['user', 'admin'];

module.exports = models;
