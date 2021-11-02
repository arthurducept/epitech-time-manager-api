'use strict';

var utils = require('../utils/writer.js');
var Authorization = require('../service/AuthorizationService');
const { getError } = require('../utils/error.js');

module.exports.Authorization_RequestToken = function (c, req, res) {
  Authorization.authorizationRequestToken(c.request.body.code)
    .then(function (response) {
      utils.writeJson(res, response, 200);
    })
    .catch(function (response) {
      getError(res, response);
    });
};
