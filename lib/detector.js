/*!
 * section matcher using cheerio
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const cheerio = require('cheerio')
const streamToString = require('../io/stream_to_string')

/**
 * Set the rule with specific tag, optional attribute and value.
 *
 * @param {string} [tag]
 * @return {function}
 * @api public
 */
module.exports = function (tag) {
  if (tag == null || tag === '') return null
  this.filter = `${tag}`

  /**
     * Get all matches according to this rule.
     *
     * @param {ReadableStream} stream
     * @param {function} callback
     */
  this.getMatch = async function (stream, callback) {
    streamToString(stream, result => {
      let $ = cheerio.load(result)
      let matches = $(this.filter)
      callback(matches || [])
    })
  }
}
