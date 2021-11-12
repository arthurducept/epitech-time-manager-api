'use strict';

const jwt = require('jsonwebtoken');
const AuthRepo = require('../repos/AuthRepo');

/**
 *
 * @param {*} email
 * @param {*} password
 * @returns
 */
exports.authorizationRequestToken = async function (email, password) {
  var credentials = await new Promise((resolve, reject) => {
    return AuthRepo.getCredentials(email, password)
      .then((response) => {
        if (email != response.email) return reject('Unauthorized');
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
  console.log(credentials);
  var tokenPayload = {
    exp: Math.floor(Date.now() / 1000) + parseInt(process.env.TOKEN_EXPIRES_IN),
    id: parseInt(credentials.id),
    role: String(credentials.role),
  };

  return new Promise((resolve, reject) => {
    var privateKey = process.env.TOKEN_SECRET_KEY;
    var token = jwt.sign(tokenPayload, privateKey, { algorithm: process.env.TOKEN_ALGORITHM });
    var tokenModel = {
      token: token,
    };
    return resolve(tokenModel);
  });
};
