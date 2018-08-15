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
let path = './test/detector/test5.html'
// let data = fs.readFileSync(path).toString()
let data = fs.createReadStream(path, { encoding: 'utf8' })

let customConfigs = [
  {
    'root': '',
    'tag': 'link',
    'attributeName': 'rel',
    'attributeValue': '',
    'attributeType': 'with',
    'minimum': 0,
    'maximum': null
  }
]

let detector = new Detector(customConfigs)
let results = detector.getResult(data)
results.forEach(result => { console.log(result) })
