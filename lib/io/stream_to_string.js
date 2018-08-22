/*!
 * Read string data from a readable stream.
 */

'use strict'

/**
 * Module exports.
 */
module.exports = streamToString

/**
 * Read string data from a readable stream.
 * @param {ReadableStream} stream
 * @param {function} callback
 * @returns {Promise}
 * @api public
 */
function streamToString (stream, callback) {
  callback = callback || function () {}
  let result = ''
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => {
      result += chunk
    })
    stream.on('end', () => {
      resolve(result)
      callback(result)
    })
    stream.on('error', err => {
      reject(err)
      callback(err)
    })
  })
}
