/*!
 * Seo Rule
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const cheerio = require('cheerio')

/**
 * Module exports.
 */
module.exports = SeoRule

/**
 * Set the rule with specific tag, optional attribute and value.
 *
 * @param {object} config
 * @return {function}
 * @api public
 */
function SeoRule (config) {
  if (config == null) return null
  if (!config.isEnable) return null
  if (config.tag == null || config.tag === '') return null
  if (config.determinType !== 'more' && config.determinType !== 'less') return null
  this.config = config
}

/**
 * Load string data.
 *
 * @param {string} data
 * @return {function}
 * @api public
*/
SeoRule.prototype.loadData = function (data) {
  this.$ = cheerio.load(data)
}

/**
 * Get result message.
 *
 * @return {string}
 * @api public
 */
SeoRule.prototype.getMessage = function () {
  let counts
  let matchCriteria = getMatchCriteria(this.config)
  let matches = this.$(matchCriteria)
  if (this.config.attributeType === 'with') {
    counts = matches.length
  } else {
    let matchTag = getMatchCriteria({'tag': this.config.tag})
    let tagMatches = this.$(matchTag)
    counts = tagMatches.length - matches.length
  }
  switch (this.config.determinType) {
    case 'more':
      if (counts > this.config.limit) {
        return getMessage(this.config, counts)
      }
      break
    case 'less':
      if (counts < this.config.limit) {
        return getMessage(this.config, counts)
      }
      break
  }
  return ''
}

function getMatchCriteria (rule) {
  let rootTag
  if (rule.root == null || rule.root === '') {
    rootTag = `${rule.tag}`
  } else {
    rootTag = `${rule.root} > ${rule.tag}`
  }
  if (rule.attributeName == null || rule.attributeName === '') {
    return rootTag
  }
  if (rule.attributeValue == null || rule.attributeValue === '') {
    return `${rootTag}[${rule.attributeName}]`
  }
  return `${rootTag}[${rule.attributeName}*=${rule.attributeValue}]`
}

function getMessage (rule, counts) {
  let rootMsg
  if (rule.root == null || rule.root === '') {
    rootMsg = 'this HTML'
  } else {
    rootMsg = `<${rule.root}>`
  }

  if (rule.attributeName == null || rule.attributeName === '') {
    return `There are ${counts} <${rule.tag}> in ${rootMsg}, ${rule.determinType} than ${rule.limit}.`
  }
  if (rule.attributeValue == null || rule.attributeValue === '') {
    return `There are ${counts} <${rule.tag}> ${rule.attributeType} attribute ${rule.attributeName} in ${rootMsg}, ${rule.determinType} than ${rule.limit}.`
  }
  return `There are ${counts} <${rule.tag}> ${rule.attributeType} attribute ${rule.attributeName}="${rule.attributeValue}" in ${rootMsg}, ${rule.determinType} than ${rule.limit}.`
}
