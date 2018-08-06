/*!
 * file
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const path = require('path');
const cheerio = require('cheerio');
const fileToStream = require('./lib/io/file_to_stream');
const tagRegex = require('./lib/detector/tag_regex');
const tagCheerio = require('./lib/detector/tag_cheerio');

/**
 * Module exports.
 */
var resolvedPath = path.resolve('./', 'test.html');
var stream = fileToStream(resolvedPath);
var detector = new tagCheerio('a', '', '');
detector.count(stream, console.log);

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
