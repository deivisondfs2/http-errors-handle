var createError = require('http-errors');
module.exports.createErrorByType = (typeError, msg) => msg ? new createError[typeError](msg) : new createError[typeError];