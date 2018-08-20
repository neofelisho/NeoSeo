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
const toString = require('../lib/io/to_string')
const _ = require('highland')

/**
 * Module exports.
 */
module.exports = Detector

/**
 * Set the SEO custom rule by config, and set the disable list.
 * @param {object} [customConfig] - optional
 * @return {function}
 * @api public
 */
function Detector (customConfig) {
  if (customConfig) {
    this.configs = defaultConfig.concat(customConfig)
  } else {
    this.configs = defaultConfig
  }
}

/**
 * Set the input data then get the SEO results.
 * @param {string|ReadableStream} inputData - plain text, file path, url or ReadableStream
 * @return {string|Promise}
 * @api public
 */
Detector.prototype.getResult = function (inputData) {
  this.inputData = inputData
  return new Promise((resolve, reject) => {
    try {
      if (typeof (this.inputData) === 'string') {
        if (isUrl(inputData)) {
          resolve('good url')
        }
        if (isFilePath(inputData)) {
          resolve('good file path')
        }
        resolve(this.inputData)
      }
      if (isReadableStream(this.inputData)) {
        resolve(toString(this.inputData))
      }
    } catch (err) {
      reject(err)
    }
  })
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
