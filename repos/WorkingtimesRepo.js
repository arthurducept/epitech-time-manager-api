'use strict';

const DB = require('../db/dbConnection');
const QueryBuilder = require('../utils/queryBuilder');

exports.getUserWorkingtimes = async function (userID, params) {
  var query = `SELECT workingtimes.id, workingtimes.start, workingtimes.end, shifts.name as shift FROM workingtimes INNER JOIN shifts ON workingtimes.shift = shifts.id WHERE workingtimes.user = $1 `;
  if (params.start && !params.end) query += `AND start >= '${params.start}' ORDER BY start ASC;`;
  if (params.end && !params.start) query += `AND workingtimes.end <= '${params.end}' ORDER BY start ASC;`;
  if (params.start && params.end) query += `AND start >= '${params.start}' AND workingtimes.end <= '${params.end}' ORDER BY start ASC;`;
  if (!params.start && !params.end) query += `ORDER BY start DESC;`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [userID], (error, result) => {
      if (error) {
        console.error(`WorkingtimesRepo : error getUserWorkingtimes() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      var response = result.rows;
      return resolve(response);
    });
  });
};

// TODO : gestion type shift
exports.postUserWorkingtimes = async function (userID, params) {
  var query = `INSERT INTO workingtimes(start, "end", "user", shift, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [params.start, params.end, userID, 1, new Date(), new Date()], (error, result) => {
      if (error && error.message.includes(`violates foreign key`)) {
        console.error(`WorkingtimesRepo : postUserWorkingtimes() =>  ${error}`);
        return reject('Bad request');
      }
      if (error) {
        console.error(`WorkingtimesRepo : error postUserWorkingtimes() =>  ${error}`);
        if (error.message.includes(`duplicate key value`)) return reject(`Conflict`);
        return reject('Error server');
      }
      var response = result.rows[0];
      return resolve(response);
    });
  });
};

exports.getUserWorkingtime = async function (userID, id) {
  var query = `SELECT workingtimes.id, workingtimes.start, workingtimes.end, shifts.name as shift FROM workingtimes INNER JOIN shifts ON workingtimes.shift = shifts.id WHERE workingtimes.user = $1 AND workingtimes.id = $2`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [userID, id], (error, result) => {
      if (error) {
        console.error(`WorkingtimesRepo : error createUser() =>  ${error}`);
        if (error.message.includes(`duplicate key value`)) return reject(`Conflict`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      var response = result.rows[0];
      return resolve(response);
    });
  });
};

exports.updateWorkingtime = async function (id, params) {
  var values = [{ column: 'updated_at', value: new Date(), type: 'timestamp' }];
  if (params.start) values.push({ column: 'start', value: params.start, type: 'timestamp without time zone' });
  if (params.end) values.push({ column: '"end"', value: params.end, type: 'timestamp without time zone' });
  var query = QueryBuilder.queryUpdate('workingtimes', values, ['id', 'start', '"end"']);
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [...values.map((val) => val.value), id], (error, result) => {
      if (error && error.message.includes(`duplicate key value`)) {
        console.error(`WorkingtimesRepo : updateWorkingtime() =>  ${error}`);
        return reject('Conflict');
      }
      if (error && error.message.includes(`violates foreign key`)) {
        console.error(`WorkingtimesRepo : updateWorkingtime() =>  ${error}`);
        return reject('Bad request');
      }
      if (error) {
        console.error(`WorkingtimesRepo : error updateWorkingtime() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      return resolve(result.rows[0]);
    });
  });
};

exports.deleteWorkingtime = async function (id) {
  var query = `DELETE FROM workingtimes WHERE id = $1;`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [id], (error, result) => {
      if (error) {
        console.error(`WorkingtimesRepo : error deleteWorkingtime() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rowCount < 1) return reject('Not found');
      return resolve(result.rows[0]);
    });
  });
};
