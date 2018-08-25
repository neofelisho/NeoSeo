/*!
 * Read string data from specific file by file path.
 */

'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')

/**
 * Module exports.
 */
module.exports = fileToString

/**
 * Read string data from a readable stream.
 * @param {string} filePath
 * @param {function} callback
 * @returns {Promise}
 * @api public
 */
function fileToString (filePath, callback) {
  callback = callback || function () {}
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
        callback(err)
      } else {
        resolve(data.toString())
        callback(data.toString())
      }
    })
  })
}
