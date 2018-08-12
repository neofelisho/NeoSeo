/*!
 * file
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const path = require('path')
const fileToStream = require('./lib/io/file_to_stream')
const TagRegex = require('./lib/detector/section_cutter')

/**
 * Module exports.
 */
var resolvedPath = path.resolve('./', 'test.html')
var stream = fileToStream(resolvedPath)
var detector = new TagRegex('a[href]')
detector.getMatch(stream, dom => {
  console.log(dom)
})

// var detector = new tagRegex('meta','name','');
// detector.count(stream, console.log);

// s2s(stream,result=>{
//     let tag = '<h1>';
//     let regex = new RegExp(tag, 'gi');
//     let matches = result.match(regex);
//     let count = (matches || []).length;
//     console.log(count);
// });

// s2s(stream, result => {
//     let dom = cheerio.load(result);
//     var count = dom('h1').length;
//     console.log(count);
// });
