'use strict';

const DB = require('../db/dbConnection');
const QueryBuilder = require('../utils/queryBuilder');

exports.getUserClock = async function (userID) {
  var query = `SELECT time, status FROM clocks WHERE "user" = $1;`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [userID], (error, result) => {
      if (error) {
        console.error(`ClocksRepo : error getUserClock() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      var response = result.rows[0];
      return resolve(response);
    });
  });
};

exports.createUserClock = async function (userID) {
  var query = `INSERT INTO clocks(time, status, "user", created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING "user", time, status`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, ['NOW()', true, userID, 'NOW()', 'NOW()'], (error, result) => {
      if (error && error.message.includes(`violates foreign key`)) {
        console.error(`ClocksRepo : createUserClock() =>  ${error}`);
        return reject('Bad request');
      }
      if (error) {
        console.error(`ClocksRepo : error createUserClock() =>  ${error}`);
        if (error.message.includes(`duplicate key value`)) return reject(`Conflict`);
        return reject('Error server');
      }
      var response = result.rows[0];
      return resolve(response);
    });
  });
};

exports.updateUserClock = async function (userID, status, date) {
  var values = [{ column: 'updated_at', value: date, type: 'timestamp' }];

  values.push({ column: 'time', value: date, type: 'timestamp' });
  values.push({ column: 'status', value: status, type: 'boolean' });

  var query = QueryBuilder.queryUpdate('clocks', values, ['"user"', 'time', 'status'], '"user"');
  console.log(query);
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [...values.map((val) => val.value), userID], (error, result) => {
      if (error && error.message.includes(`duplicate key value`)) {
        console.error(`ClocksRepo : updateUserClock() =>  ${error}`);
        return reject('Conflict');
      }
      if (error && error.message.includes(`violates foreign key`)) {
        console.error(`ClocksRepo : updateUserClock() =>  ${error}`);
        return reject('Bad request');
      }
      if (error) {
        console.error(`ClocksRepo : error updateUserClock() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      return resolve(result.rows[0]);
    });
  });
};
