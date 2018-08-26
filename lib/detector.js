/*!
 * SEO detector
 */

'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs')
// const stream = require('stream')
const defaultConfig = require('../config/default')
const SeoRule = require('../lib/seo_rule')
const streamToString = require('../lib/io/stream_to_string')
const fileToString = require('../lib/io/file_to_string')
const urlToString = require('./io/url_to_string')
const arrayToStream = require('./io/array_to_stream')
const commonStream = require('./io/common_stream')

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
  this.configs = defaultConfig
  if (disabledList) {
    disabledList.forEach(disable => {
      if (typeof (disable) === 'string') {
        this.configs = this.configs.filter(config => config.ruleName !== disable)
      }
      if (typeof (disable) === 'number') {
        this.configs = this.configs.filter(config => config.ruleNo !== disable)
      }
    })
  }
  if (customConfig) {
    this.configs = this.configs.concat(customConfig)
  }
}

/**
 * Get the results of SEO detector.
 * @param {string|ReadableStream} input - ReadableStream, file path, url or plain text.
 * @param {string|ReadableStream} [output]
 * @param {function} [callback]
 * @returns {Promise}
 * @api public
 */
Detector.prototype.getResult = function (input, output, callback) {
  if (!callback && typeof (output) === 'function') {
    callback = output
  }
  if (!output && callback) {
    output = callback
  }
  if (!output && !callback) {
    output = process.stdout
  }

  let inputTask = setInput(input, this.configs, callback)
  let outputTask = inputTask.then(arrayToStream)

  Promise.all([inputTask, outputTask]).then(results => {
    if (commonStream.isWritableStream(output)) {
      results[1].pipe(output)
    } else if (typeof (output) === 'function') {
      streamToString(results[1], output)
    } else if (typeof (output) === 'string') {
      let outStream = fs.createWriteStream(output)
      results[1].pipe(outStream)
    } else {
      callback(Error('Parameter output must be `WritableStream`, `function` or `file path`.'))
    }
  }).catch(err => {
    callback(err)
  })
}

function setInput (input, configs, callback) {
  if (typeof (input) === 'string') {
    if (isFilePath(input)) {
      return getResultFromFile(input, configs)
    } else if (isUrl(input)) {
      return getResultFromUrl(input, configs)
    } else {
      return getResultFromString(input, configs)
    }
  } else if (commonStream.isReadableStream(input)) {
    return getResultFromStream(input, configs)
  } else {
    callback(Error('Parameter input must be `ReadableStream`, `file path`, `url` or `plain text`.'))
  }
}

function getResultFromString (data, configs) {
  return new Promise((resolve, reject) => {
    try {
      resolve(runSeoResults(data, configs))
    } catch (err) {
      reject(err)
    }
  })
}

function getResultFromUrl (url, configs) {
  let task = urlToString(url)
  return task.then(data => runSeoResults(data, configs))
}

function getResultFromFile (filePath, configs) {
  let task = fileToString(filePath)
  return task.then(data => runSeoResults(data, configs))
}

function getResultFromStream (stream, configs) {
  let task = streamToString(stream)
  return task.then(data => runSeoResults(data, configs))
}

function runSeoResults (data, configs) {
  let results = []
  configs.forEach(config => {
    let rule = new SeoRule(config)
    let ruleName = config.ruleName ? config.ruleName : '<No rule name>'
    if (!rule) {
      results.push(`${ruleName}: Incorrect rule config.`)
    }
    let result = rule.getResult(data)
    if (result && result !== '') {
      results.push(`${ruleName}: ${result}`)
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

// function isReadableStream (obj) {
//   return obj instanceof stream.Stream && typeof (obj.on) === 'function' &&
//     typeof (obj._read) === 'function' && typeof (obj._readableState) === 'object'
// }

// function isWritableStream (obj) {
//   return obj instanceof stream.Stream && typeof (obj.on) === 'function' &&
//     typeof (obj._write) === 'function' && typeof (obj._writableState) === 'object'
// }
