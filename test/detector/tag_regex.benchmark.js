/*!
 * Benchmark of tag_cheerio
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Dependencies.
 */
const path = require('path');
const fileToStream = require('../../lib/io/file_to_stream');
const tagRegex = require('../../lib/detector/tag_regex');

let testerArray = [];
for (var i = 0; i < 10; i++) {
    testerArray.push(`test${i}.html`);
}

let ruleArray = [];
ruleArray.push(new tagRegex('link', 'rel', 'dns-prefetch'));
ruleArray.push(new tagRegex('meta', 'name', ''));
ruleArray.push(new tagRegex('h1', '', ''));
ruleArray.push(new tagRegex('strong', '', ''));
ruleArray.push(new tagRegex('a', '', ''));

testerArray.forEach(tester => {
    let resolvedPath = path.resolve('./test/detector', tester);
    ruleArray.forEach(rule => {
        console.time(`Test ${tester} for ${rule.ruleName}`);
        var stream = fileToStream(resolvedPath);
        rule.count(stream, _ => console.timeEnd(`Test ${tester} for ${rule.ruleName}`));
    });
});