'use strict';

var utils = require('../utils/writer.js');
var Authorization = require('../service/AuthorizationService');
const { getError } = require('../utils/error.js');

module.exports.Authorization_RequestToken = function (c, req, res) {
  if (!c.request.body.email || !c.request.body.password) return getError(res, 'Bad request');
  if (!c.request.body.email.match(/^[\w-]+@[\w-]+\.[\w]+$/g)) return getError(res, 'Bad request');

  Authorization.authorizationRequestToken(c.request.body.email, c.request.body.password)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};
