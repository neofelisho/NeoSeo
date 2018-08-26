/*!
 * Read string data from specific url.
 */

'use strict'

/**
 * Module dependencies.
 */
const http = require('http')
const https = require('https')

/**
 * Module exports.
 */
module.exports = urlToString

/**
 * Read string data from a readable stream.
 * @param {string} url
 * @param {function} [callback]
 * @returns {Promise}
 * @api public
 */
function urlToString (url, callback) {
  callback = callback || function () {}
  return new Promise((resolve, reject) => {
    let client
    if (isHttp(url)) {
      client = http
    } else if (isHttps) {
      client = https
    } else {
      callback(Error('Parameter url should start with `http` or `https`.'))
    }
    client.get(url, response => {
      let data = ''
      response.on('data', chunk => {
        data += chunk
      })
      response.on('end', () => {
        resolve(data)
        callback(data)
      })
    }).on('error', err => {
      reject(err)
      callback(err)
    })
  })
}

function isHttp (obj) {
  let regex = new RegExp('^http://.*', 'gi')
  return obj.match(regex)
}

function isHttps (obj) {
  let regex = new RegExp('^https://.*', 'gi')
  return obj.match(regex)
}
