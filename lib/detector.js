/*!
 * SEO detector
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const defaultConfig = require('../config/default')
const SeoRule = require('../lib/seo_rule')

/**
 * Module exports.
 */
module.exports = Detector

/**
 * Set the SEO target(data), enabled/disabled default rules, and custom rules.
 *
 * @param {object} customConfig
 * @return {function}
 * @api public
 */
function Detector (customConfig) {
  this.configs = defaultConfig.concat(customConfig)
}

/**
 * Get SEO results.
 *
 * @param {object} data
 * @return {array}
 * @api public
 */
Detector.prototype.getResult = function (data) {
  let results = []
  this.configs.forEach(config => {
    let rule = new SeoRule(config)
    let result = rule.getResult(data)
    if (result != null && result !== '') {
      results.push(result)
    }
  })
  return results
}
