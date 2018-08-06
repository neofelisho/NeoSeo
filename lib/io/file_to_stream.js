/*!
 * file to stream
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
module.exports = fileToStream;

/**
 * Create a middleware to read file as stream.
 *
 * @param {string} [path]
 * @returns {ReadableStream}
 * @api public
 */
function fileToStream(path) {
    return fs.createReadStream(path, { encoding: 'utf8' });
}