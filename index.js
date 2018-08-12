/*!
 * file
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const configs = require('./config/default')
// const fileToStream = require('./lib/io/file_to_stream')
// const streamToString = require('./lib/io/stream_to_string')
const SeoRule = require('./lib/seo_rule')
const fs = require('fs')

/**
 * Module exports.
 */
var data = fs.readFileSync('./test.html').toString()

configs.forEach(config => {
  var rule = new SeoRule(config)
  rule.loadData(data)
  let msg = rule.getMessage()
  if (msg != null && msg !== '') {
    console.log(msg)
  }
})
