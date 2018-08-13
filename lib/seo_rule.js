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
 * Get result message.
 *
 * @param {string} data
 * @return {string}
 * @api public
 */
SeoRule.prototype.getResult = function (data) {
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

function getRootTag (config) {
  if (config.root == null || config.root === '') {
    return `${config.tag}`
  }
  return `${config.root} > ${config.tag}`
}

function getMatchCriteria (config) {
  let rootTag = getRootTag(config)
  if (config.attributeName == null || config.attributeName === '') {
    return rootTag
  }
  if (config.attributeValue == null || config.attributeValue === '') {
    return `${rootTag}[${config.attributeName}]`
  }
  return `${rootTag}[${config.attributeName}*=${config.attributeValue}]`
}

function getMessage (config, counts) {
  let rootMsg
  if (config.root == null || config.root === '') {
    rootMsg = 'this HTML'
  } else {
    rootMsg = `<${config.root}>`
  }

  if (config.attributeName == null || config.attributeName === '') {
    return `There are ${counts} <${config.tag}> in ${rootMsg}, ${config.determinType} than ${config.limit}.`
  }
  if (config.attributeValue == null || config.attributeValue === '') {
    return `There are ${counts} <${config.tag}> ${config.attributeType} attribute ${config.attributeName} in ${rootMsg}, ${config.determinType} than ${config.limit}.`
  }
  return `There are ${counts} <${config.tag}> ${config.attributeType} attribute ${config.attributeName}="${config.attributeValue}" in ${rootMsg}, ${config.determinType} than ${config.limit}.`
}
