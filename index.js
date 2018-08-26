/*!
 * NeoSeo
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const Detector = require('./lib/detector')

/**
 * Module exports.
 */

let customConfigs = [
  {
    'ruleName': 'Rule <link> with rel',
    'tag': 'link',
    'attributeName': 'rel',
    'attributeType': 'with',
    'minimum': 1
  }
]

let detector = new Detector(customConfigs)
let input = './test/detector/test0.html'
let output = process.stdout
detector.getResult(input, output, console.log)
