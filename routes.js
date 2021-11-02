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

  // /**
  //  * GET /cases/{idCase}/customers
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getCustomers: async(c, req, res) => {
  //   const Cases = require('./controllers/Cases');
  //   return Cases.getCustomers(c, req, res);
  // },

  // /**
  //  * PUT /customers/{idCustomer}
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // updateCustomer: async(c, req, res) => {
  //   const Cases = require('./controllers/Cases');
  //   return Cases.updateCustomer(c, req, res);
  // },

  // /**
  //  * GET /customers/{idCustomer}/payment
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getPayment: async(c, req, res) => {
  //   const Payment = require('./controllers/Payment');
  //   return Payment.getPayment(c, req, res);
  // },

  // /**
  //  * POST /customers/{idCustomer}/payment
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // postPayment: async(c, req, res) => {
  //   const Payment = require('./controllers/Payment');
  //   return Payment.postPayment(c, req, res);
  // },

  // /**
  //  * PUT /customers/{idCustomer}/payment
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // putPayment: async(c, req, res) => {
  //   const Payment = require('./controllers/Payment');
  //   return Payment.putPayment(c, req, res);
  // },

  // /**
  //  * PUT /cases/{idCase}/status
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // updateCase: async(c, req, res) => {
  //   const Status = require('./controllers/Status');
  //   return Status.updateStatus(c, req, res);
  // },

  // /**
  //  * GET /cases/{idCase}/progressReport
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getProgressReport: async(c, req, res) => {
  //   const Cases = require('./controllers/Cases');
  //   return Cases.getProgressReport(c, req, res);
  // },

  // /**
  //  * GET /cases/{idCase}/pdf
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getCasePDF: async(c, req, res) => {
  //   const Cases = require('./controllers/Cases');
  //   return Cases.getCasePDF(c, req, res);
  // },

  // /**
  //  * GET /availabilities
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getAvailabilities: async(c, req, res) => {
  //   const Appointments = require('./controllers/Appointments');
  //   return Appointments.getAvailabilities(c, req, res);
  // },

  // /**
  //  * GET /appointments
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getAppointments: async(c, req, res) => {
  //   const Appointments = require('./controllers/Appointments');
  //   return Appointments.getAppointments(c, req, res);
  // },

  // /**
  //  * POST /appointments
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // createAppointments: async(c, req, res) => {
  //   const Appointments = require('./controllers/Appointments');
  //   return Appointments.createAppointments(c, req, res);
  // },

  // /**
  //  * PUT /appointments/{idAppointment}
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // updateAppointments: async(c, req, res) => {
  //   const Appointments = require('./controllers/Appointments');
  //   return Appointments.updateAppointments(c, req, res);
  // },

  // /**
  //  * GET /search
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getSearchResults: async(c, req, res) => {
  //   const Search = require('./controllers/Search');
  //   return Search.getSearchResults(c, req, res);
  // },

  // /**
  //  * GET /type/status
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getStatus: async(c, req, res) => {
  //   const Status = require('./controllers/Status');
  //   return Status.getStatus(c, req, res);
  // },

  // /**
  //  * GET /apporteurs
  //  * @param {*} c
  //  * @param {*} req
  //  * @param {*} res
  //  */
  // getApporteurs: async(c, req, res) => {
  //   const Cases = require('./controllers/Cases');
  //   return Cases.getApporteurs(c, req, res);
  // },
};
