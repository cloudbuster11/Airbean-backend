const utils = {};

utils.calculateNewEta = require('./calcNewEta');
utils.connectToDb = require('./databaseConnector');
utils.AppError = require('./appError');
utils.apiFeatures = require('./apiFeatures');
utils.catchAsync = require('./catchAsync');
utils.sendEmail = require('./email');

module.exports = utils;
