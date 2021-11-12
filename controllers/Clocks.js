'use strict';

var utils = require('../utils/writer.js');
var { getError } = require('../utils/error');
var Clocks = require('../service/ClocksService');

module.exports.getUserClock = function getUserClock(c, req, res) {
  if (!c.request.params.userID) return getError(res, 'Bad request');
  else var userID = c.request.params.userID;

  var base64 = c.request.headers.authorization.replace(/Bearer /, '').split('.')[1];
  var buffer = new Buffer.from(base64, 'base64');
  var decodedToken = JSON.parse(buffer.toString('ascii'));
  if (decodedToken.role == 'Employee' && userID != decodedToken.id)return getError(res, 'Unauthorized');

  Clocks.getUserClock(userID)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.postUserClock = function postUserClock(c, req, res) {
  if (!c.request.params.userID) return getError(res, 'Bad request');
  else var userID = c.request.params.userID;

  var base64 = c.request.headers.authorization.replace(/Bearer /, '').split('.')[1];
  var buffer = new Buffer.from(base64, 'base64');
  var decodedToken = JSON.parse(buffer.toString('ascii'));
  if (decodedToken.role == 'Employee' && userID != decodedToken.id)return getError(res, 'Unauthorized');
  
  Clocks.postUserClock(userID)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      getError(res, response);
    });
};
