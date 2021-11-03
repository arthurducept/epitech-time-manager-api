'use strict';

var utils = require('../utils/writer.js');
var { getError } = require('../utils/error');
var Workingtimes = require('../service/WorkingtimesService');

// salaire moy 11.25$
// 9-12 14-18 normale
// 7 9
// 18 22 heures supp 1.5
// 22 - 7 heures de nuit 2

module.exports.getUserWorkingtimes = function getUserWorkingtimes(c, req, res) {
  if (!c.request.params.userID) return getError(res, 'Bad request');
  else var userID = c.request.params.userID;
  Workingtimes.getUserWorkingtimes(userID)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.postUserWorkingtimes = function postUserWorkingtimes(c, req, res) {
  var params = {};
  if (!c.request.params.userID || !c.request.body.start || !c.request.body.end) return getError(res, 'Bad request');
  else {
    var userID = c.request.params.userID;
    params.start = c.request.body.start;
    params.end = c.request.body.end;
  }
  if (params.start >= params.end) return getError(res, 'Bad request');
  var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/g;
  if (!params.start.match(regex)) return getError(res, 'Bad request');
  if (!params.end.match(regex)) return getError(res, 'Bad request');
  Workingtimes.postUserWorkingtimes(userID, params)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.getUserWorkingtime = function getUserWorkingtime(c, req, res) {
  if (!c.request.params.userID || !c.request.params.id) return getError(res, 'Bad request');
  else {
    var userID = c.request.params.userID;
    var id = c.request.params.id;
  }
  Workingtimes.getUserWorkingtime(userID, id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.updateWorkingtime = function updateWorkingtime(c, req, res) {

  if (!c.request.params.id) return getError(res, 'Bad request');
  else var id = c.request.params.id;

  var params = {};
  if (c.request.body) var params = c.request.body;
  var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/g;
  if (params.start && !params.start.match(regex)) return getError(res, 'Bad request');
  if (params.end && !params.end.match(regex)) return getError(res, 'Bad request');
  Workingtimes.updateWorkingtime(id, params)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.deleteWorkingtime = function deleteWorkingtime(c, req, res) {
  if (!c.request.params.id) return getError(res, 'Bad request');
  else var id = c.request.params.id;
  Workingtimes.deleteWorkingtime(id)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};
