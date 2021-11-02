/**
 * 
 * @param {[string]} selectParams 
 * @param {string} table 
 * @param {[string]} conditions
 * @param { object } orderBy
 * @param {integer || null }  limit
 * @param {integer} offset
 */
exports.querySimpleGet = function(selectParams, table, conditions, orderBy, limit, offset) {

  var query = `SELECT ${selectParams.join(', ')} FROM ${table}`

  if (conditions.length > 0) {

    query += ' WHERE'
    for (var j = 0; j < conditions.length; j++) {

      query += ` ${Object.keys(conditions[j])[0]} ${conditions[j].operator} $${j + 1}::${conditions[j].type}`

      if (j !== conditions.length - 1) {
        query += ` AND`
      }

    }
  }

  if (orderBy !== null) query += ` ORDER BY ${orderBy.name} ${orderBy.sens}`
  if (limit !== null) query += ` LIMIT ${limit}`
  if (limit !== null && offset !== null) query += ` OFFSET ${offset}`

  return query;
}

exports.queryInsert = function(table, values) {

  var query = `INSERT INTO ${table} (${values.map(val => val.column)}) VALUES (`

  for (var index = 0; index < values.length; index++) {

    query += `$${index + 1}::${values[index].type}`

    if (index !== values.length - 1) {
      query += `, `
    }

  }

  query += `) RETURNING ${values.map(val => val.column)}, id`
  return query;
}

/**
 * Constructeur de requête UPDATE
 * @param {String} table - table de la base dans laquelle on update une ligne
 * @param {Array} values - liste des valeurs à insérer
 * @param {Array} returning - liste des colonnes à retourner
 * @param {Array} condition - colonne identifiant la ligne à modifier
 * @returns Any
 */
exports.queryUpdate = function(table, values, returning, condition) {

  var query = `UPDATE ${table} SET(${values.map(val => val.column)}) = (`

  for (var index = 0; index < values.length; index++) {

    query += `$${index + 1}::${values[index].type}`

    if (index !== values.length - 1) {
      query += `, `
    }
  }
  if (!condition) condition = "id"
  query += `) WHERE ${condition}=$${index + 1}::integer RETURNING ${returning.join(', ')}`
  return query;
}