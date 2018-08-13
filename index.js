/*!
 * file
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const Detector = require('./lib/detector')
const fs = require('fs')

/**
 * Module exports.
 */
let data = fs.readFileSync('./test.html').toString()

let customConfigs = [
  {
    'root': '',
    'tag': 'link',
    'attributeName': 'rel',
    'attributeValue': '',
    'attributeType': 'with',
    'limit': 0,
    'determinType': 'more',
    'isEnable': true
  }
]

let detector = new Detector(customConfigs)
let results = detector.getResult(data)
// configs.forEach(config => {
//   let rule = new SeoRule(config)
//   let result = rule.getResult(data)
//   if (result != null && result !== '') {
//     results.push(result)
//   }
// })
results.forEach(result => { console.log(result) })
