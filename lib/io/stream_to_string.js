/*!
 * stream to string
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
module.exports = streamToString;

/**
 * Create a middleware to read file.
 *
 * @param {ReadableStream} [stream]
 * @param {function} [callback]
 * @api public
 */
function streamToString(stream, callback) {
    let result = '';
    
    /**
     * For the flowing of data.
     */
    stream.on('data', data => {
        result += data;
    });
    // /**
    //  * For the close of file stream.
    //  */
    // stream.on('close', () => {
    //     callback(result);
    // });
    /**
     * For the end of object stream.
     */
    stream.on('end', () => {
        callback(result)
    });
    stream.on('finish', () => {
        callback(result)
    });
}