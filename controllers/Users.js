'use strict';

var utils = require('../utils/writer.js');
var { getError } = require('../utils/error');
var Users = require('../service/UsersService');

// module.exports.createCase = function createCase(c, req, res) {
//   var base64 = c.request.headers.authorization.replace(/Bearer /, '').split('.')[1];
//   var buffer = new Buffer.from(base64, 'base64');
//   var decodedToken = buffer.toString('ascii'); // TODO : récupérer la valeur de l'utilisateur connecté
//   var userLogged = decodedToken;
//   var body = c.request.body;
//   if (body.customerA == null || body.customerA == undefined || body.customerA.contactEmail == null || body.customerA.contactEmail == undefined || body.customerA.contactTel == null || body.customerA.contactTel == undefined || body.customerB == null || body.customerB == undefined || body.customerB.contactEmail == null || body.customerB.contactEmail == undefined || body.customerB.contactTel == null || body.customerB.contactTel == undefined) {
//     getError(res, 'Bad request');
//   } else {
//     Cases.createCase(userLogged, body) // TODO : userLogged
//       .then(function (response) {
//         utils.writeJson(res, response, 201);
//       })
//       .catch(function (response) {
//         getError(res, response);
//       });
//   }
// };

module.exports.getUser = function getUser(c, req, res) {
  if (!c.request.params.userID) return getError(res, 'Bad request');
  else var userID = c.request.params.userID;
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
  if (!c.request.body.username || !c.request.body.email) return getError(res, 'Bad request');

  // TODO : ajouter champs
  if (c.request.body.username) params.username = c.request.body.username;
  if (c.request.body.email) params.email = c.request.body.email;

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
      utils.writeJson(res, response, 204);
    })
    .catch(function (response) {
      getError(res, response);
    });
};

// module.exports.getCustomers = function getCustomers(c, req, res) {
//   var idCase = c.request.params.idCase;
//   if (!idCase) return getError(res, 'Bad request');
//   Customers.getCustomers(idCase)
//     .then(function (response) {
//       utils.writeJson(res, response, 200);
//     })
//     .catch(function (response) {
//       getError(res, response);
//     });
// };

// module.exports.updateCustomer = function updateCustomer(c, req, res) {
//   var idCustomer = c.request.params.idCustomer;
//   var body = c.request.body;
//   Customers.updateCustomer(idCustomer, body)
//     .then(function (response) {
//       utils.writeJson(res, response, 201);
//     })
//     .catch(function (response) {
//       getError(res, response);
//     });
// };

// module.exports.getProgressReport = function getProgressReport(c, req, res) {
//   var idCase = parseInt(c.request.params.idCase);
//   if (!idCase || typeof idCase !== 'number') return getError(res, 'Bad request');
//   Cases.getProgressReport(idCase)
//     .then(function (response) {
//       utils.writeJson(res, response, 200);
//     })
//     .catch(function (response) {
//       getError(res, response);
//     });
// };

// module.exports.getCasePDF = function getCasePDF(c, req, res) {
//   Cases.getCasePDF()
//     .then(function (response) {
//       utils.writeJson(res, response, 200);
//     })
//     .catch(function (response) {
//       getError(res, response);
//     });
// };

// module.exports.getApporteurs = function getApporteurs(c, req, res) {
//   Cases.getApporteurs()
//     .then(function (response) {
//       utils.writeJson(res, response, 201);
//     })
//     .catch(function (response) {
//       getError(res, response);
//     });
// };
