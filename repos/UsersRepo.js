'use strict';

const DB = require('../db/dbConnection');
const QueryBuilder = require('../utils/queryBuilder');

exports.getUser = async function (userID) {
  var query = `SELECT firstname, lastname, username, email, roles.name as role FROM users INNER JOIN roles ON users.role = roles.id WHERE users.id = $1;`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [userID], (error, result) => {
      if (error) {
        console.error(`UsersRepo : error getUser() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      var response = result.rows[0];
      return resolve(response);
    });
  });
};

exports.getUsers = async function (params) {
  var query = 'SELECT firstname, lastname, username, email, roles.name as role FROM users INNER JOIN roles ON users.role = roles.id ';
  if (Object.keys(params).length != 0) {
    query += 'WHERE ';
    for (var key in params) {
      if (params.hasOwnProperty(key)) query += `${key} ILIKE '%${params[key]}%' AND `;
    }
    query = query.substring(0, query.length - 4);
  }
  query += 'ORDER BY users.id ASC;';
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, (error, result) => {
      if (error) {
        console.error(`UsersRepo : error getUsers() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      var response = result.rows;
      return resolve(response);
    });
  });
};

exports.createUser = async function (params) {
  console.log(params);
  var query = `INSERT INTO users(username, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [params.username, params.email, params.password, params.role, 'NOW()', 'NOW()'], (error, result) => {
      if (error && error.message.includes(`duplicate key value`)) {
        console.error(`UsersRepo : updateUser() =>  ${error}`);
        return reject('Conflict');
      }
      if (error && error.message.includes(`violates foreign key`)) {
        console.error(`UsersRepo : updateUser() =>  ${error}`);
        return reject('Bad request');
      }
      if (error) {
        console.error(`UsersRepo : error createUser() =>  ${error}`);
        if (error.message.includes(`duplicate key value`)) return reject(`Conflict`);
        return reject('Error server');
      }
      var response = result.rows[0];
      return resolve(response);
    });
  });
};

exports.updateUser = async function (userID, params) {
  var values = [{ column: 'updated_at', value: 'NOW()', type: 'timestamp' }];
  if (params.firstname) values.push({ column: 'firstname', value: params.firstname, type: 'character varying' });
  if (params.lastname) values.push({ column: 'lastname', value: params.lastname, type: 'character varying' });
  if (params.username) values.push({ column: 'username', value: params.username, type: 'character varying' });
  if (params.email) values.push({ column: 'email', value: params.email, type: 'character varying' });
  if (params.password) values.push({ column: 'password', value: params.password, type: 'character varying' });
  if (params.role) values.push({ column: 'role', value: params.role, type: 'integer' });
  var query = QueryBuilder.queryUpdate('users', values, ['id', 'firstname', 'lastname', 'username', 'email', 'password', 'role']);
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [...values.map((val) => val.value), userID], (error, result) => {
      if (error && error.message.includes(`duplicate key value`)) {
        console.error(`UsersRepo : updateUser() =>  ${error}`);
        return reject('Conflict');
      }
      if (error && error.message.includes(`violates foreign key`)) {
        console.error(`UsersRepo : updateUser() =>  ${error}`);
        return reject('Bad request');
      }
      if (error) {
        console.error(`UsersRepo : error updateUser() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      return resolve(result.rows[0]);
    });
  });
};

exports.deleteUser = async function (userID) {
  var query = `DELETE FROM users WHERE id = ${userID};`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, (error, result) => {
      if (error) {
        console.error(`UsersRepo : error deleteUser() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rowCount < 1) return reject('Not found');
      return resolve(result.rows[0]);
    });
  });
};
