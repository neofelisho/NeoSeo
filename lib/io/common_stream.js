/*!
 * Common methods of node stream.
 */

'use strict'

/**
 * Module dependencies.
 */
const stream = require('stream')

/**
 * Module exports.
 */
module.exports.isReadableStream = function (obj) {
  return obj instanceof stream.Stream && typeof (obj.on) === 'function' &&
    typeof (obj._read) === 'function' && typeof (obj._readableState) === 'object'
}

module.exports.isWritableStream = function (obj) {
  return obj instanceof stream.Stream && typeof (obj.on) === 'function' &&
    typeof (obj._write) === 'function' && typeof (obj._writableState) === 'object'
}
