/*!
 * tag detector using cheerio
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 */
const cheerio = require('cheerio');
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
    if (attribute == null || attribute == '') {
        this.filter = `${tag}`;
    }
    else if (value == null || value == '') {
        this.filter = `${tag}[${attribute}]`;
    }
    else {
        this.filter = `${tag}[${attribute}*=${value}]`;
        
    }
    /**
     * Count the occurences according this rule.
     * 
     * @param {ReadableStream} stream 
     * @param {function} callback 
     */
    this.count = function (stream, callback) {
        streamToString(stream, result => {
            let $ = cheerio.load(result);
            let matches = $(this.filter);
            let count = (matches || []).length;
            callback(count);
        });
    };

    this.ruleName = `${tag}_${attribute}_${value}`;
};