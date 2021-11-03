'use strict';

const WorkingtimesRepo = require('../repos/WorkingtimesRepo');

exports.getUserWorkingtimes = async function (userID) {
  return WorkingtimesRepo.getUserWorkingtimes(userID);
};

exports.postUserWorkingtimes = async function (userID, params) {
  return WorkingtimesRepo.postUserWorkingtimes(userID, params);
};

exports.getUserWorkingtime = async function (userID, id) {
  return WorkingtimesRepo.getUserWorkingtime(userID, id);
};

exports.updateWorkingtime = async function (id, params) {
  return WorkingtimesRepo.updateWorkingtime(id, params);
};

exports.deleteWorkingtime = async function (id) {
  return WorkingtimesRepo.deleteWorkingtime(id);
};
