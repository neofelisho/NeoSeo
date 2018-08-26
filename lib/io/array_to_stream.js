/*!
 * Convert the string array to a readable stream.
 */

'use strict'

/**
 * Module dependencies.
 */
const Readable = require('stream').Readable
const os = require('os')

/**
 * Module exports.
 */
module.exports = arrayToStream

/**
 * Convert string to a readable stream.
 * @param {Array} array
 * @param {function} callback
 * @returns {Promise}
 * @api public
 */
function arrayToStream (array, callback) {
  callback = callback || function () {}
  let stream = new Readable()
  return new Promise((resolve, reject) => {
    try {
      if (!array) throw new Error('Parameter `array` should be an `Array`')
      array.forEach(element => {
        stream.push(`${element}${os.EOL}`)
      })
      stream.push(null)
      resolve(stream)
      callback(stream)
    } catch (err) {
      reject(err)
      callback(err)
      stream.destroy()
    }
  })
}
