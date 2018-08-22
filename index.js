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
// const cheerio = require('cheerio')
const streamToString = require('./lib/io/stream_to_string')
const stringToStream = require('./lib/io/string_to_stream')

/**
 * Module exports.
 */

// let customConfigs = [
//   {
//     'root': '',
//     'tag': 'link',
//     'attributeName': 'rel',
//     'attributeValue': '',
//     'attributeType': 'with',
//     'minimum': 0,
//     'maximum': null
//   }
// ]

// let detector = new Detector(customConfigs)
// detector.getResult(stream).then
// detector.getResult(stream, console.log)

let path = './test/detector/test5.html'
// let url = 'https://neofelisho.github.io/2018/08/2018-08-05-nodejs-getting-started/'
// let data = fs.readFileSync(path).toString()
let stream = fs.createReadStream(path, { encoding: 'utf8' })
let p1 = streamToString(stream)
let p2 = p1.then(stringToStream)
Promise.all([p1, p2]).then(results => {
  // console.log(results[0])
  results[1].pipe(process.stdout)
})
