/*!
 * SEO detector
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
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

/**
 * Module exports.
 */
module.exports = Detector

/**
 * Set the SEO target(data), enabled/disabled default rules, and custom rules.
 *
 * @param {object} [customConfig]
 * @return {function}
 * @api public
 */
function Detector (customConfig) {
  if (customConfig == null) {
    this.configs = defaultConfig
  } else {
    this.configs = defaultConfig.concat(customConfig)
  }
}

/**
 * Get SEO results.
 *
 * @param {string|ReadableStream} data
 * @return {array}
 * @api public
 */
Detector.prototype.getResult = function (data) {
  if (typeof (data) === 'string') {
    if (isFilePath(data)) {
      return getResultFromFile(data, this.configs)
    } else {
      return getResultFromString(data, this.configs)
    }
  }
  if (isReadableStream(data)) {
    return getResultFromStream(data, this.configs)
  }
  return []
}

function getResultFromFile (filePath, configs) {
  return getResultFromString(fs.readFileSync(filePath), configs)
}

function getResultFromStream (stream, configs) {
  let data = ''
  stream.on('data', chunk => {
    data += chunk
  })
  stream.on('end', () => {
    return getResultFromString(data, configs)
  })
}

function getResultFromString (data, configs) {
  let results = []
  configs.forEach(config => {
    let rule = new SeoRule(config)
    let result = rule.getResult(data)
    if (result != null && result !== '') {
      results.push(result)
    }
  })
  return results
}

function isFilePath (obj) {
  let regex = new RegExp('^.*.(html|htm|txt)$', 'gi')
  return obj.match(regex)
}

function isReadableStream (obj) {
  return obj instanceof stream.Stream && typeof (obj.on) === 'function' && typeof (obj._read) === 'function' && typeof (obj._readableState) === 'object'
}

// function removeEmptyLine (data) {
//   let regex = /^\s*[\r\n]/gm
//   return data.replace(regex, '')
// }
