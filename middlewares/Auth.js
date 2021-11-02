'use strict';

const jwt = require('jsonwebtoken');

exports.authToken = function (context, req, res) {
  return new Promise(function (resolve, reject) {
    var token = context.request.headers['authorization'].substr('Bearer '.length);
    try {
      jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      resolve(res);
    } catch (err) {
      console.error(err);
      reject(401);
    }
  });
};

exports.authAPIKEY = function (context, req, res) {
  return new Promise(function (resolve, reject) {
    if (context.request.headers[process.env.APIKEY_NAME] === 'undefined' || context.request.headers[process.env.APIKEY_NAME] !== process.env.APIKEY_SECRET) {
      reject(401);
    } else {
      return resolve(res);
    }
  });
};
