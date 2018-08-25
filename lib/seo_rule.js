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
  // todo: review the config checker
  if (!config || !config.tag || config.tag === '' || (!config.minimum && !config.maximum)) {
    this.config = null
  } else {
    this.config = config
  }
}

/**
 * Get result message.
 *
 * @param {string} data
 * @return {string}
 * @api public
 */
SeoRule.prototype.getResult = function (data) {
  if (!this.config) {
    return 'Incorrect rule config.'
  }
  let $ = cheerio.load(data)
  let counts
  let matchCriteria = getMatchCriteria(this.config)
  let matches = $(matchCriteria)
  if (this.config.attributeType === 'with') {
    counts = matches.length
  } else {
    let matchTag = getMatchCriteria({'tag': getRootTag(this.config)})
    let tagMatches = $(matchTag)
    counts = tagMatches.length - matches.length
  }
  if (!this.config.minimum) {
    if (counts < this.config.maximum) {
      return getMessage(this.config, counts)
    }
  } else if (!this.config.maximum) {
    if (counts > this.config.minimum) {
      return getMessage(this.config, counts)
    }
  } else {
    if (counts > this.config.minimum && counts < this.config.maximum) {
      return getMessage(this.config, counts)
    }
  }
  return ''
}

function getRootTag (config) {
  if (!config.root || config.root === '') {
    return `${config.tag}`
  }
  return `${config.root} > ${config.tag}`
}

function getMatchCriteria (config) {
  let rootTag = getRootTag(config)
  if (!config.attributeName || config.attributeName === '') {
    return rootTag
  }
  if (!config.attributeValue || config.attributeValue === '') {
    return `${rootTag}[${config.attributeName}]`
  }
  return `${rootTag}[${config.attributeName}*=${config.attributeValue}]`
}

function getMessage (config, counts) {
  let rootMsg = getRootMessage(config.root)
  let determinCondition = getDetermineCondition(config.minimum, config.maximum)

  if (!config.attributeName || config.attributeName === '') {
    return `There are ${counts} <${config.tag}> in ${rootMsg}, ${determinCondition}.`
  }
  if (!config.attributeValue || config.attributeValue === '') {
    return `There are ${counts} <${config.tag}> ${config.attributeType} attribute ${config.attributeName} in ${rootMsg}, ${determinCondition}.`
  }
  return `There are ${counts} <${config.tag}> ${config.attributeType} attribute ${config.attributeName}="${config.attributeValue}" in ${rootMsg}, ${determinCondition}.`
}

function getDetermineCondition (minimum, maximum) {
  if (!minimum) {
    return `less than ${maximum}`
  }
  if (!maximum) {
    return `more than ${minimum}`
  }
  return `between ${minimum} and ${maximum}`
}

function getRootMessage (root) {
  if (!root || root === '') {
    return 'this HTML'
  }
  return `<${root}>`
}
