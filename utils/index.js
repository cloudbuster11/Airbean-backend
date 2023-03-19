const utils = {};

utils.calculateNewEta = require('./calcNewEta');
utils.connectToDb = require('./databaseConnector');
utils.AppError = require('./appError');
utils.apiFeatures = require('./apiFeatures');
utils.catchAsync = require('./catchAsync');
utils.Email = require('./email');
utils.checkUserId = require('./checkUserid');

module.exports = utils;
