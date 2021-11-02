'use strict';

const DB = require('../db/dbConnection');
const QueryBuilder = require('../utils/queryBuilder');

exports.getUser = async function (userID) {
  var query = `SELECT username, email FROM users WHERE id = ${userID};`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, (error, result) => {
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
  var query = 'SELECT username, email FROM users ';
  if (Object.keys(params).length != 0) {
    query += 'WHERE ';
    for (var key in params) {
      if (params.hasOwnProperty(key)) query += `${key} ILIKE '%${params[key]}%' AND `;
    }
    query = query.substring(0, query.length - 4);
  }
  query += 'ORDER BY id ASC;';
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
  var query = `INSERT INTO users(username, email, inserted_at, updated_at) VALUES ($1, $2, $3, $4)`;
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [params.username, params.email, 'NOW()', 'NOW()'], (error, result) => {
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
  console.log(userID, params);
  // TODO : revoir values
  var values = [{ column: 'updated_at', value: 'NOW()', type: 'timestamp' }];
  if (params.username) values.push({ column: 'username', value: params.username, type: 'character varying' });
  if (params.email) values.push({ column: 'email', value: params.email, type: 'character varying' });
  var query = QueryBuilder.queryUpdate('users', values, ['id', 'username', 'email']);
  return new Promise((resolve, reject) => {
    return DB.connectDB().query(query, [...values.map((val) => val.value), userID], (error, result) => {
      if (error && error.message.includes(`duplicate key value`)) {
        console.error(`UsersRepo : updateUser() =>  ${error}`);
        return reject('Conflict');
      }
      if (error) {
        console.error(`UsersRepo : error updateUser() =>  ${error}`);
        return reject('Error server');
      }
      if (result.rows.length < 1) return reject('Not found');
      return resolve(result.rows[0]);
      // var response = result.rows[0];
      // return resolve(response);
    });
  });
};

// exports.createCase = async function (body, customerA, customerB, dateCreation, stateStartCase) {
//   var values = [
//     { column: 'created_at', value: dateCreation, type: 'timestamp' },
//     { column: 'updated_at', value: dateCreation, type: 'timestamp' },
//     { column: 'status', value: 0, type: 'integer' },
//     { column: 'state_start_case', value: stateStartCase, type: 'character varying' },
//     { column: 'id_prescriber', value: body.idPrescriber, type: 'integer' },
//     { column: 'sinister_number', value: body.sinisterNumber, type: 'character varying' },
//     { column: 'email_jurist', value: body.emailJurist, type: 'character varying' },
//     { column: 'details', value: body.details, type: 'character varying' },
//     { column: 'id_customer_a', value: customerA.idCustomer, type: 'integer' },
//     { column: 'id_customer_b', value: customerB.idCustomer, type: 'integer' },
//     { column: 'sub_mediator', value: process.env.SUB_MEDIATOR, type: 'character varying' },
//   ];

//   var query = QueryBuilder.queryInsert('cases', values);
//   return new Promise((resolve, reject) => {
//     return DB.connectDB().query(
//       query,
//       values.map((val) => val.value),
//       (error, result) => {
//         if (error && error.message.includes(`duplicate key value`)) {
//           console.error(`CasesService : createCase() =>  ${error}`);
//           return reject('Conflict');
//         }
//         if (error && error.message.includes(`violates not-null constraint`)) {
//           console.error(`CasesService : null createCase() =>  ${error}`);
//           return reject('Bad request');
//         }
//         if (error) {
//           console.error(`CasesService : error createCase() =>  ${error}`);
//           return reject('Error server');
//         }
//         return resolve(result.rows[0]);
//       }
//     );
//   });
// };

// exports.getCases = async function (params) {
//   var idCase = params.idCase;
//   var idCustomer = params.idCustomer;
//   var lastName = params.lastName;
//   var sortBy = params.sortBy;
//   var orderBy = params.orderBy;
//   var limit = params.limit;
//   var offset = params.offset;
//   var input = params.input;
//   var apporteur = params.apporteur;
//   var status = params.status;
//   var customersCode = params.customersCode;
//   var values = [];
//   var index = 1;
//   var query = `
//   SELECT cases.id,
//   type_status.id AS id_status, type_status.name AS status_name,
//   id_prescriber, sinister_number, email_jurist, details,
//   customer_a.id AS id_customer_a,
//   customer_a.first_name AS customer_a_first_name,
//   customer_a.last_name AS customer_a_last_name,
//   customer_a.contact_email AS customer_a_contact_email,
//   customer_a.contact_tel AS customer_a_contact_tel,
//   customer_a.postal_code AS customer_a_postal_code,
//   ${customersCode ? 'customer_a.code AS customer_a_code,':''}
//   customer_b.id AS id_customer_b,
//   customer_b.first_name AS customer_b_first_name,
//   customer_b.last_name AS customer_b_last_name,
//   customer_b.contact_email AS customer_b_contact_email,
//   customer_b.contact_tel AS customer_b_contact_tel,
//   customer_b.postal_code AS customer_b_postal_code
//   ${customersCode ? ', customer_b.code AS customer_b_code':''}
//   FROM cases
//   LEFT JOIN type_status ON type_status.id = cases.status
//   LEFT JOIN customers AS customer_a ON customer_a.id = cases.id_customer_a
//   LEFT JOIN customers AS customer_b ON customer_b.id = cases.id_customer_b
//   `;

//   if (idCase) {
//     values.push(idCase);
//     query += `WHERE cases.id = $${index}::integer `;
//     index++;
//   }
//   if (idCustomer) {
//     values.push(parseInt(idCustomer));
//     query += `${idCase ? 'AND' : 'WHERE'} id_customer_a = $${index}::integer OR id_customer_b = $${index}::integer `;
//     index++;
//   }
//   if (lastName) {
//     values.push(`%${lastName.toLowerCase().split('').join('%')}%`);
//     query += `${idCase || idCustomer ? 'AND' : 'WHERE'} (LOWER(customer_a.last_name) ILIKE($${index}::character varying) OR LOWER(customer_b.last_name) ILIKE($${index}::character varying)) `;
//     index++;
//   }
//   if (input) {
//     values.push(`%${input.toLowerCase().split('').join('%')}%`);
//     query += `${
//       idCase || idCustomer || lastName ? 'AND' : 'WHERE'
//     } customer_a.first_name ILIKE($${index}::character varying) OR customer_a.last_name ILIKE($${index}::character varying) OR customer_a.contact_email ILIKE($${index}::character varying) OR customer_a.contact_tel ILIKE($${index}::character varying) OR customer_b.first_name ILIKE($${index}::character varying) OR customer_b.last_name ILIKE($${index}::character varying) OR customer_b.contact_email ILIKE($${index}::character varying) OR customer_b.contact_tel ILIKE($${index}::character varying) OR sinister_number ILIKE($${index}::character varying) `;
//     index++;
//   }
//   if (apporteur) {
//     values.push(`%${apporteur.toLowerCase().split('').join('%')}%`);
//     query += `${idCase || idCustomer || lastName || input ? 'AND' : 'WHERE'} email_jurist ILIKE($${index}::character varying) `;
//     index++;
//   }
//   if (status) {
//     values.push(parseInt(status[0]));
//     query += `${idCase || idCustomer || lastName || input || apporteur ? 'AND' : 'WHERE'} (cases.status = $${index}::integer `;
//     index++;
//     if (status.length > 1) {
//       for (let i = 1; i < status.length; i++) {
//         query += `OR cases.status = $${index}::integer `;
//         values.push(status[i]);
//         index++;
//       }
//     }
//     query += `)`;
//   }

//   if (sortBy) {
//     let sortParam;
//     switch (sortBy) {
//       case 'apporteur':
//         sortParam = 'id_prescriber';
//         break;
//       case 'id':
//         sortParam = 'cases.id';
//         break;
//       case 'date':
//         sortParam = 'cases.updated_at';
//         break;
//       case 'name':
//         sortParam = 'customer_a.last_name';
//         break;
//       case 'phone':
//         sortParam = 'customer_a.contact_tel';
//         break;
//       case 'email':
//         sortParam = 'email_jurist';
//         break;
//       case 'status':
//         sortParam = 'status';
//       default:
//         break;
//     }
//     query += `ORDER BY ${sortParam}`;
//   }

//   if (orderBy && (orderBy === 'desc' || orderBy === 'asc' || orderBy === 'default')) {
//     if (!sortBy) {
//       query += 'ORDER BY cases.id';
//     }
//     switch (orderBy) {
//       case 'desc':
//         query += ` DESC`;
//         break;
//       case 'asc':
//       case 'default':
//         query += ` ASC`;
//         break;
//     }
//   }

//   if (limit) query += ` LIMIT ${limit}`;
//   if (limit && offset) query += ` OFFSET ${offset}`;

//   query += ';';
//   return new Promise((resolve, reject) => {
//     return DB.connectDB().query(query, values, (error, result) => {
//       if (error && error.message.includes(`duplicate key value`)) {
//         console.error(`CasesService : getCases() =>  ${error}`);
//         return reject('Conflict');
//       }
//       if (error && error.message.includes(`violates not-null constraint`)) {
//         console.error(`CasesService : null getCases() =>  ${error}`);
//         return reject('Bad request');
//       }
//       if (error) {
//         console.error(`CasesService : error getCases() =>  ${error}`);
//         return reject('Error server');
//       }
//       if (result.rows.length < 1) return reject('Not found');
//       return resolve({
//         count: result.rowCount,
//         cases: result.rows,
//       });
//     });
//   });
// };

// exports.getProgressReport = async function (idCase) {
//   var query = 'SELECT * FROM logs_communication WHERE id_case = $1::integer ORDER BY sent_at ASC';
//   return new Promise((resolve, reject) => {
//     return DB.connectDB().query(query, [idCase], (error, result) => {
//       if (error) {
//         console.error(`CasesRepo : error getProgressReport() =>  ${error}`);
//         return reject('Error server');
//       }
//       if (result.rows.length < 1) return reject('Not found');
//       var response = result.rows;
//       return resolve(response);
//     });
//   });
// };

// exports.getApporteurs = async function () {
//   var query = `SELECT DISTINCT email_jurist FROM cases`;
//   return new Promise((resolve, reject) => {
//     return DB.connectDB().query(query, (error, result) => {
//       if (error && error.message.includes(`duplicate key value`)) {
//         console.error(`CasesService : getApporteurs() =>  ${error}`);
//         return reject('Conflict');
//       }
//       if (error && error.message.includes(`violates not-null constraint`)) {
//         console.error(`CasesService : null getApporteurs() =>  ${error}`);
//         return reject('Bad request');
//       }
//       if (error) {
//         console.error(`CasesService : error getApporteurs() =>  ${error}`);
//         return reject('Error server');
//       }
//       if (result.rows.length < 1) return reject('Not found');
//       return resolve(result.rows);
//     });
//   });
// };
