'use strict'

/**
 * Fonction pour retirer les doublons d'une liste d'objets en fonction d'une des propriétés
 * @param {Array} list - liste d'objets JSON
 * @param {*} key - array => array.identifier
 * @returns Array
 */
exports.removeDuplicates = function getUniqueList(list, key) {
  var result = [
    ...new Map(
      list.map(el => [key(el), el])
    ).values()
  ]
  return result.filter(el => el.id_case !== null && el.id_case !== undefined)
}