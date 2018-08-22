/*!
 * Convert string to a readable stream.
 */

'use strict'

/**
 * Module dependencies.
 */
const Readable = require('stream').Readable

/**
 * Module exports.
 */
module.exports = stringToStream

/**
 * Convert string to a readable stream.
 * @param {string} str
 * @param {function} callback
 * @returns {Promise}
 * @api public
 */
function stringToStream (str, callback) {
  callback = callback || function () {}
  let stream = new Readable()
  return new Promise((resolve, reject) => {
    try {
      stream.push(str)
      stream.push(null)
      resolve(stream)
      callback(stream)
    } catch (err) {
      reject(err)
      callback(err)
    }
  })
}
