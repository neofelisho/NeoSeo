/*!
 * object to stream
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const Readable = require('stream').Readable;

/**
 * Module exports.
 */
module.exports = objectToStream;

/**
 * Create a middleware to convert object to steam.
 *
 * @param {object} [input]
 * @returns {ReadableStream}
 * @api public
 */
function objectToStream(input) {
    var stream = new Readable();
    stream.push(input);
    stream.push(null);
    return stream;
}