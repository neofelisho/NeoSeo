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
    'root': '',
    'tag': 'img',
    'attributeName': 'alt',
    'attributeValue': '',
    'attributeType': 'without',
    'limit': 0,
    'determinType': 'more',
    'isEnable': true
  },
  {
    'root': '',
    'tag': 'a',
    'attributeName': 'rel',
    'attributeValue': '',
    'attributeType': 'without',
    'limit': 0,
    'determinType': 'more',
    'isEnable': true
  },
  {
    'root': 'head',
    'tag': 'title',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': 'with',
    'limit': 1,
    'determinType': 'less',
    'isEnable': true
  },
  {
    'root': 'head',
    'tag': 'meta',
    'attributeName': 'name',
    'attributeValue': 'descriptions',
    'attributeType': 'with',
    'limit': 1,
    'determinType': 'less',
    'isEnable': true
  },
  {
    'root': 'head',
    'tag': 'meta',
    'attributeName': 'name',
    'attributeValue': 'keywords',
    'attributeType': 'with',
    'limit': 1,
    'determinType': 'less',
    'isEnable': true
  },
  {
    'root': '',
    'tag': 'strong',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': 'with',
    'limit': 15,
    'determinType': 'more',
    'isEnable': true
  },
  {
    'root': '',
    'tag': 'h1',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': 'with',
    'limit': 1,
    'determinType': 'more',
    'isEnable': true
  }]
