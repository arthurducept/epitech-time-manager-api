'use strict';

const ClocksRepo = require('../repos/ClocksRepo');
const WorkingtimesRepo = require('../repos/WorkingtimesRepo');

exports.getUserClock = async function (userID) {
  return ClocksRepo.getUserClock(userID);
};

exports.postUserClock = async function (userID) {
  var clock = await this.getUserClock(userID).catch((error) => console.log(error));
  if (!clock) return ClocksRepo.createUserClock(userID);
  else {
    if (clock.status) {
      var date = new Date();
      var params = {
        start: clock.time,
        end: date,
      };
      WorkingtimesRepo.postUserWorkingtimes(userID, params);
      return ClocksRepo.updateUserClock(userID, false, date);
    } else return ClocksRepo.updateUserClock(userID, true);
  }
};
