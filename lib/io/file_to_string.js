/*!
 * file to string
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const fs = require('fs');

/**
 * Module exports.
 */
module.exports = fileToString;

/**
 * Create a middleware to read the file content as string.
 *
 * @param {string} [path]
 * @param {function} [callback]
 * @api public
 */
function fileToString(path,callback) {
    fs.readFile(path, (err, data) => {
        if (err) throw err;
        callback(data.toString());
    });
}