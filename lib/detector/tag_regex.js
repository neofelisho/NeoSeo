/*!
 * file to stream
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const streamToString = require('../io/stream_to_string');

/**
 * Set the rule with specific tag, optional attribute and value.
 *
 * @param {string} [tag]
 * @param {string} [attribute]
 * @param {string} [value]
 * @return {function}
 * @api public
 */
module.exports = function (tag, attribute, value) {
    if (tag == null || tag == '') return 0;
    let regex;
    if (attribute == null || tag == '') {
        regex = new RegExp(`<${tag}.*>`, 'gi');
    }
    else if (value == null || value == '') {
        regex = new RegExp(`<${tag}.*${attribute}.*>`, 'gi');
    }
    else {
        regex = new RegExp(`<${tag}.*${attribute}\s*=\s*["|']${value}["|'].*>`,'gi');
        
    }

    /**
     * Count the occurences according this rule.
     * 
     * @param {ReadableStream} stream 
     * @param {function} callback 
     */
    this.count = function (stream, callback) {
        streamToString(stream, result => {
            let matches = result.match(regex);
            let count = (matches || []).length;
            callback(count);
        });
    };
};