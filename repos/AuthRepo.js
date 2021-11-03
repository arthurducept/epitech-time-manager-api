'use strict';

const DB = require('../db/dbConnection');

exports.getCredentials = async function (email, password) {
  var query = `SELECT users.id, email, roles.name as role FROM users INNER JOIN roles ON users.role = roles.id WHERE users.email = $1::character varying AND users.password = $2::character varying;`;
  const existingUser = await new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [email, password], (error, result) => {
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
  return existingUser;
};
