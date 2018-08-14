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
    'minimum': 0,
    'maximum': null
  },
  {
    'root': '',
    'tag': 'a',
    'attributeName': 'rel',
    'attributeValue': '',
    'attributeType': 'without',
    'minimum': 0,
    'maximum': null
  },
  {
    'root': 'head',
    'tag': 'title',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': 'with',
    'minimum': null,
    'maximum': 1
  },
  {
    'root': 'head',
    'tag': 'meta',
    'attributeName': 'name',
    'attributeValue': 'descriptions',
    'attributeType': 'with',
    'minimum': null,
    'maximum': 1
  },
  {
    'root': 'head',
    'tag': 'meta',
    'attributeName': 'name',
    'attributeValue': 'keywords',
    'attributeType': 'with',
    'minimum': null,
    'maximum': 1
  },
  {
    'root': '',
    'tag': 'strong',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': 'with',
    'minimum': 15,
    'maximum': null
  },
  {
    'root': '',
    'tag': 'h1',
    'attributeName': '',
    'attributeValue': '',
    'attributeType': 'with',
    'minimum': 1,
    'maximum': null
  }]
