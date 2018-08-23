/*!
 * Convert the string array to a readable stream.
 */

'use strict'

/**
 * Module dependencies.
 */
const Readable = require('stream').Readable

/**
 * Module exports.
 */
module.exports = arrayToStream

/**
 * Convert string to a readable stream.
 * @param {Array<string>} array
 * @param {function} callback
 * @returns {Promise}
 * @api public
 */
function arrayToStream (array, callback) {
  callback = callback || function () {}
  let stream = new Readable()
  return new Promise((resolve, reject) => {
    try {
      array.forEach(element => {
        stream.push(`${element}\n`)
      })
      stream.push(null)
      resolve(stream)
      callback(stream)
    } catch (err) {
      reject(err)
      callback(err)
    }
  })
}
