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
// detector.getResult(stream, console.log)

let input = './test/detector/test8.html'
// let output = fs.createReadStream('output.txt', { encoding: 'utf8' })
// let output = console.log
// let output = fs.createWriteStream('output.txt')
let output = process.stdout
// let output = 'output.txt'
// let url = 'httaps://stackoverflow.com/questions/34628305/using-promises-with-fs-readfile-in-a-loop'

// let data = fs.readFileSync(path).toString()
// let stream = fs.createReadStream(path, { encoding: 'utf8' })
detector.getResult(input, output, console.log)
// detector.getResult(input, output, (err) => {
//   if (err) {
//     console.log(err)
//   }
// })

// let p1 = streamToString(stream)
// let p2 = p1.then(stringToStream)
// Promise.all([p1, p2]).then(results => {
//   // console.log(results[0])
//   results[1].pipe(process.stdout)
// })
