var utils = require('../utils/writer.js');

/**
 *
 * @param {*} res
 * @param {*} response
 * @param {*} code
 */
module.exports.getError = function getError(res, response) {
  console.error(response);

  var responseInsensitive = response.toString().toLowerCase();

  switch (responseInsensitive) {
    case 'bad request':
      return utils.writeJson(res, response, 400);
      break;
    case 'Bad request':
      return utils.writeJson(res, response, 400);
      break;
    case 'unauthorized':
      return utils.writeJson(res, response, 401);
      break;
    case 'Unauthorized':
      return utils.writeJson(res, response, 401);
      break;
    case 'forbidden':
      return utils.writeJson(res, response, 403);
      break;
    case 'Forbidden':
      return utils.writeJson(res, response, 403);
      break;
    case 'not found':
      return utils.writeJson(res, response, 404);
      break;
    case 'Not found':
      return utils.writeJson(res, response, 404);
      break;
    case 'conflict':
      return utils.writeJson(res, response, 409);
      break;
    case 'Conflict':
      return utils.writeJson(res, response, 409);
      break;
    case 'error server':
      return utils.writeJson(res, response, 500);
      break;
    case 'Error server':
      return utils.writeJson(res, response, 500);
      break;
    default:
      return utils.writeJson(res, response, 500);
      break;
  }
};
