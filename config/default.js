/*!
 * Default configurations
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Set the rule with specific tag, optional attribute and value.
 *
 * @return {object}
 * @api public
 */
module.exports = [
  {
    'ruleName': '<img /> tag without alt attribute',
    'ruleNo': 0,
    'root': '',
    'tag': 'img',
    'attributeName': 'alt',
    'attributeValue': '',
    'attributeType': 'without',
    'minimum': 0,
    'maximum': null
  },
  {
    'ruleName': '<a /> tag without rel attribute',
    'ruleNo': 1,
    'root': '',
    'tag': 'a',
    'attributeName': 'rel',
    'attributeValue': '',
    'attributeType': 'without',
    'minimum': 0,
    'maximum': null
  },
  {
    'ruleName': 'No <title> tag in <haed>',
    'ruleNo': 2,
    'root': 'head',
    'tag': 'title',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': '',
    'minimum': null,
    'maximum': 1
  },
  {
    'ruleName': 'No <meta> tag with name="description" attribute in <haed>',
    'ruleNo': 3,
    'root': 'head',
    'tag': 'meta',
    'attributeName': 'name',
    'attributeValue': 'descriptions',
    'attributeType': 'with',
    'minimum': null,
    'maximum': 1
  },
  {
    'ruleName': 'No <meta> tag with name="keywords" attribute in <haed>',
    'ruleNo': 4,
    'root': 'head',
    'tag': 'meta',
    'attributeName': 'name',
    'attributeValue': 'keywords',
    'attributeType': 'with',
    'minimum': null,
    'maximum': 1
  },
  {
    'ruleName': 'More than 15 <strong> tag',
    'ruleNo': 5,
    'root': '',
    'tag': 'strong',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': '',
    'minimum': 15,
    'maximum': null
  },
  {
    'ruleName': 'More than 1 <H1> tag',
    'ruleNo': 6,
    'root': '',
    'tag': 'h1',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': '',
    'minimum': 1,
    'maximum': null
  }]
