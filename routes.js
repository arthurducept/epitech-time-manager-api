'use strict';

module.exports.router = {
  /**
   * GET /authorization
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  Authorization_RequestToken: async (c, req, res) => {
    const Authorization = require('./controllers/Authorization');
    return Authorization.Authorization_RequestToken(c, req, res);
  },

  /**
   * GET /users
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  getUsers: async (c, req, res) => {
    const Users = require('./controllers/Users');
    return Users.getUsers(c, req, res);
  },

  /**
   * GET /users/${userID}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  getUser: async (c, req, res) => {
    const Users = require('./controllers/Users');
    return Users.getUser(c, req, res);
  },

  /**
   * POST /users
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  createUser: async (c, req, res) => {
    const Users = require('./controllers/Users');
    return Users.createUser(c, req, res);
  },

  /**
   * PUT /users/{userID}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  updateUser: async (c, req, res) => {
    const Users = require('./controllers/Users');
    return Users.updateUser(c, req, res);
  },

  /**
   * DELETE /users/{userID}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  deleteUser: async (c, req, res) => {
    const Users = require('./controllers/Users');
    return Users.deleteUser(c, req, res);
  },
};
