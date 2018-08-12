/*!
 * tag detector using regualr expression
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const streamToString = require('../io/stream_to_string')

/**
 * Set the rule with specific tag, optional attribute and value.
 *
 * @param {string} [tag]
 * @param {string} [attribute]
 * @param {string} [value]
 * @return {function}
 * @api public
 */
module.exports = function (tag, attribute, value) {
  if (tag == null || tag === '') return 0
  if (attribute == null || tag === '') {
    this.regex = new RegExp(`<${tag}.*>`, 'gsi')
  } else if (value == null || value === '') {
    this.regex = new RegExp(`<${tag}.*${attribute}.*>`, 'gsi')
  } else {
    /* eslint-disable no-useless-escape */
    this.regex = new RegExp(`<${tag}.*${attribute}\s*=\s*("|')${value}("|').*>`, 'gsi')
    /* eslint-enable no-useless-escape */
  }

  /**
     * Count the occurences according to this rule.
     *
     * @param {ReadableStream} stream
     * @param {function} callback
     */
  this.count = function (stream, callback) {
    streamToString(stream, result => {
      let matches = result.match(this.regex)
      let count = (matches || []).length
      callback(count)
    })
  }

  this.ruleName = `${tag}_${attribute}_${value}`
}
