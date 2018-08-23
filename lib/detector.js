/*!
 * SEO detector
 */

'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')
const stream = require('stream')
const defaultConfig = require('../config/default')
const SeoRule = require('../lib/seo_rule')
const streamToString = require('../lib/io/stream_to_string')
const stringToStream = require('../lib/io/string_to_stream')
const arrayToStream = require('../lib/io/array_to_stream')

/**
 * Module exports.
 */
module.exports = Detector

/**
 * Set the SEO target(data), enabled/disabled default rules, and custom rules.
 * @param {object} [customConfig]
 * @param {Int32Array|Array<string>} [disabledList]
 * @returns {function}
 * @api public
 */
function Detector (customConfig, disabledList) {
  if (disabledList) {

  }
  if (customConfig) {
    this.configs = defaultConfig.concat(customConfig)
  } else {
    this.configs = defaultConfig
  }
}

/**
 * Get the results of SEO detector.
 * @param {string|ReadableStream} input - ReadableStream, file path, url or plain text.
 * @param {string|ReadableStream} [output]
 * @param {function} callback
 * @returns {Promise}
 * @api public
 */
Detector.prototype.getResult = function (input, output, callback) {
  let inputTask, outputTask
  if (typeof (input) === 'string') {
    if (isFilePath(input)) {
      inputTask = getResultFromFile(input, this.configs)
    } else if (isUrl(input)) {
      inputTask = getResultFromUrl(input, this.configs)
    } else {
      inputTask = new Promise((resolve, reject) => {
        try {
          resolve(getResultFromString(input))
        } catch (err) {
          reject(err)
        }
      })
    }
  } else if (isReadableStream(input)) {
    inputTask = getResultFromStream(input, this.configs)
  } else {
    callback(Error('Parameter input must be `ReadableStream`, `file path`, `url` or `plain text`.'))
  }

  outputTask = inputTask.then(arrayToStream)
  Promise.all([inputTask, outputTask]).then(results => {
    results[1].pipe(output)
  })
}

function setInput (input, configs) {
  return new Promise((resolve, reject) => {
    try {
      if (typeof (input) === 'string') {
        if (isFilePath(input)) {
          resolve(getResultFromFile(input, configs))
        } else if (isUrl(input)) {
          resolve('good url')
        } else {
          resolve(getResultFromString(input, configs))
        }
      }
      if (isReadableStream(input)) {
        getResultFromStream(input, configs)
          .then((results) => {
            resolve(results)
          })
      }
    } catch (err) {
      reject(err)
    }
  })
}

function getResultFromFile (filePath, configs) {
  let task = new Promise((resolve, reject) => {
    try {
      fs.readFile(filePath, resolve)
    } catch (err) {
      reject(err)
    }
  })
  return task.then(data => getResultFromString(data, configs))
  // return getResultFromString(fs.readFileSync(filePath), configs)
}

function getResultFromUrl (url, configs) {
  let task = new Promise((resolve, reject) => {
    try {
      fs.readFile(url, resolve)
    } catch (err) {
      reject(err)
    }
  })
  return task.then(data => getResultFromString(data, configs))
  // return getResultFromString(fs.readFileSync(filePath), configs)
}

// function getResultFromStream (stream, configs) {
//   return new Promise((resolve) => {
//     streamToString(stream, data => {
//       resolve(getResultFromString(data, configs))
//     })
//   })
// }

function getResultFromStream (stream, configs) {
  let task = streamToString(stream)
  return task.then(data => getResultFromString(data, configs))
}

function getResultFromString (data, configs) {
  let results = []
  configs.forEach(config => {
    let rule = new SeoRule(config)
    let result = rule.getResult(data)
    if (result && result !== '') {
      results.push(result)
    }
  })
  return results
}

function isUrl (obj) {
  let regex = new RegExp('^(http|https)://.*', 'gi')
  return obj.match(regex)
}

function isFilePath (obj) {
  let regex = new RegExp('^.*.(html|htm|txt)$', 'gi')
  return obj.match(regex)
}

function isReadableStream (obj) {
  return obj instanceof stream.Stream && typeof (obj.on) === 'function' && typeof (obj._read) === 'function' && typeof (obj._readableState) === 'object'
}
