'use strict';

const jwt = require('jsonwebtoken');
const AuthRepo = require('../repos/AuthRepo');

/**
 * Fonction permettant d'authentifier un customer grâce à son code et son nom de famille
 * @param {String} code - Code e-billet du customer
 * @param {String} name - 3 premières lettres du nom de famille
 * @returns Token
 */
exports.authorizationRequestToken = async function (code) {
  // code = code.toUpperCase();
  // var credentials = await new Promise((resolve, reject) => {
  //   return AuthRepo.getCredentials(code)
  //     .then((response) => {
  //       return resolve(response);
  //     })
  //     .catch((error) => {
  //       return reject(error);
  //     });
  // });

  var tokenPayload = await {
    exp: Math.floor(Date.now() / 1000) + parseInt(process.env.TOKEN_EXPIRES_IN),
    // idCase: parseInt(credentials.id_case),
    // idCustomer: parseInt(credentials.id_customer),
    // whichPart: parseInt(credentials.id_customer) == parseInt(credentials.id_customer_a) ? 'A' : 'B',
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
