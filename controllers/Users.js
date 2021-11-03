'use strict';

var utils = require('../utils/writer.js');
var { getError } = require('../utils/error');
var Users = require('../service/UsersService');

module.exports.getUser = function getUser(c, req, res) {
  if (!c.request.params.userID) return getError(res, 'Bad request');
  else var userID = c.request.params.userID;
  // var base64 = c.request.headers.authorization.replace(/Bearer /, '').split('.')[1];
  // var buffer = new Buffer.from(base64, 'base64');
  // var decodedToken = JSON.parse(buffer.toString('ascii'));
  // if (decodedToken.role == 'Employee') if (userID != decodedToken.id) return getError(res, 'Unauthorized');
  Users.getUser(userID)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.getUsers = function getUsers(c, req, res) {
  var params = {};
  // TODO : ajouter champs
  if (c.request.query.username) params.username = c.request.query.username;
  if (c.request.query.email) params.email = c.request.query.email;

  Users.getUsers(params)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.createUser = function createUser(c, req, res) {
  var params = {};
  if (!c.request.body.username || !c.request.body.email || !c.request.body.password || !c.request.body.role) return getError(res, 'Bad request');
  // TODO : ajouter champs
  if (c.request.body.username) params.username = c.request.body.username;
  if (c.request.body.email) params.email = c.request.body.email;
  if (c.request.body.password) params.password = c.request.body.password;
  if (c.request.body.role) params.role = c.request.body.role;

  if (!params.email.match(/^[\w-]+@[\w-]+\.[\w]+$/g)) return getError(res, 'Bad request');

  Users.createUser(params)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.updateUser = function updateUser(c, req, res) {
  var params = {};

  if (!c.request.params.userID) return getError(res, 'Bad request');
  else var userID = c.request.params.userID;

  if (c.request.body) var params = c.request.body;
  if (params.email && !c.request.body.email.match(/^[\w-]+@[\w-]+\.[\w]+$/g)) return getError(res, 'Bad request');

  Users.updateUser(userID, params)
    .then(function (response) {
      utils.writeJson(res, response, 201);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

module.exports.deleteUser = function deleteUser(c, req, res) {
  if (!c.request.params.userID) return getError(res, 'Bad request');
  else var userID = c.request.params.userID;

  Users.deleteUser(userID)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};
