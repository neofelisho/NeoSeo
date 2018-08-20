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
const objectToStream = require('./lib/io/object_to_stream')

/**
 * Module exports.
 */
let path = './test/detector/test5.html'
let url = 'https://neofelisho.github.io/2018/08/2018-08-05-nodejs-getting-started/'
// let data = fs.readFileSync(path).toString()
let stream = fs.createReadStream(path, { encoding: 'utf8' })
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
// detector.getResult(stream).then
detector.getResult(stream).then(resultStream => {
  streamToString(resultStream, data => {
    console.log(data)
  })
})
// let resultstream = detector.getResultByStream(stream)
// streamToString(resultstream, data => {
//   console.log(data)
// })
// detector.getResult(stream).then(results => {
//   results.forEach(result => { console.log(result) })
// })

// detector.getResultFromStream(stream, customConfigs).then(results => {
//   results.forEach(result => {
//     console.log(result)
//   })
// })

// streamToString(stream, data => {
//   console.log(data)
//   let results = detector.getResult(data)
//   results.forEach(result => {
//     console.log(result)
//   })
// })

// let promise = new Promise((resolve) => {
//   streamToString(stream, data => {
//     resolve(detector.getResult(data))
//   })
// })

// promise.then(results => {
//   results.forEach(result => {
//     console.log(result)
//   })
// })

// results.forEach(result => { console.log(result) })
