const utils = {};

utils.calculateNewEta = require('./eta');
utils.connectToDb = require('./databaseConnector');
// utils.initializeRoles = require('./initializeRoles');

module.exports = utils;
