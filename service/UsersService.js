'use strict';

const UsersRepo = require('../repos/UsersRepo');

exports.getUser = async function (userID) {
  return UsersRepo.getUser(userID);
};

exports.getUsers = async function (params) {
  return UsersRepo.getUsers(params);
};

exports.createUser = async function (params) {
  return UsersRepo.createUser(params);
};

exports.updateUser = async function (userID, params) {
  return UsersRepo.updateUser(userID, params);
};

exports.deleteUser = async function (userID) {
  return UsersRepo.deleteUser(userID);
};
