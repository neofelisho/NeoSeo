/*!
 * Get string data from a readable stream.
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 */
module.exports = toString

/**
 * Get string data from a readable stream.
 * @param {ReadableStream} [stream]
 * @api public
 */
function toString (stream) {
  let result = ''

  /**
   * For the data flowing of the stream.
   */
  stream.on('data', data => {
    result += data
  })
  /**
   * For the end of the stream.
   */
  stream.on('end', () => {
    return result
  })
  /**
   * For the error of the stream
   */
  stream.on('error', err => {
    throw err
  })
}
