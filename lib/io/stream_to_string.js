/*!
 * Read string data from a readable stream.
 */

'use strict'

/**
 * Module dependencies.
 */
const commonStream = require('./common_stream')

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
    if (!commonStream.isReadableStream(stream)) {
      let err = new Error('Parameter `stream` should be a `ReadableStream`.')
      reject(err)
      callback(err)
    }
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
      stream.destroy()
    })
  })
}
