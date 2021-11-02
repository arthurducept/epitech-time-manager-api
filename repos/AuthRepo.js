'use strict';

const DB = require('../db/dbConnection');

exports.getCredentials = async function (code) {
  var query = `SELECT cases.id as id_case, id_customer_a, id_customer_b, customers.id as id_customer, code 
  FROM customers LEFT JOIN cases ON (id_customer_a=customers.id OR id_customer_b=customers.id) WHERE code = $1::character varying`;
  var queryInsert = `INSERT INTO timestamp(created_at, code) VALUES($1::timestamp, $2::character varying) RETURNING id, created_at, code`;

  const existingUser = await new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [code], (error, result) => {
      if (error) {
        console.error(`Auth Repo : error getCredentials() select =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length > 0) {
        return resolve(result.rows[0]);
      } else {
        return reject('Unauthorized');
      }
    });
  });
  if (existingUser) {
    new Promise((resolve, reject) => {
      return DB.connectDB().query(queryInsert, [new Date(), code], (error, result) => {
        if (error) {
          console.error(`Auth Repo : error getCredentials() insert =>  ${error}`);
          return reject('Error server');
        }
        return resolve(result.rows);
      });
    });
  }
  return existingUser;
};
