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

  /**
   * GET /workingtimes/{userID}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  getUserWorkingtimes: async (c, req, res) => {
    const Workingtimes = require('./controllers/Workingtimes');
    return Workingtimes.getUserWorkingtimes(c, req, res);
  },

  /**
   * POST /workingtimes/{userID}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  postUserWorkingtimes: async (c, req, res) => {
    const Workingtimes = require('./controllers/Workingtimes');
    return Workingtimes.postUserWorkingtimes(c, req, res);
  },

  /**
   * GET /workingtimes/{userID}/{id}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  getUserWorkingtime: async (c, req, res) => {
    const Workingtimes = require('./controllers/Workingtimes');
    return Workingtimes.getUserWorkingtime(c, req, res);
  },

  /**
   * PUT /workingtimes/{id}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  updateWorkingtime: async (c, req, res) => {
    const Workingtimes = require('./controllers/Workingtimes');
    return Workingtimes.updateWorkingtime(c, req, res);
  },

  /**
   * DELETE /workingtimes/{id}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  deleteWorkingtime: async (c, req, res) => {
    const Workingtimes = require('./controllers/Workingtimes');
    return Workingtimes.deleteWorkingtime(c, req, res);
  },

  /**
   * GET /clocks/${userID}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  getUserClock: async (c, req, res) => {
    const Clocks = require('./controllers/Clocks');
    return Clocks.getUserClock(c, req, res);
  },

  /**
   * POST /clocks/${userID}
   * @param {*} c
   * @param {*} req
   * @param {*} res
   */
  postUserClock: async (c, req, res) => {
    const Clocks = require('./controllers/Clocks');
    return Clocks.postUserClock(c, req, res);
  },
};
