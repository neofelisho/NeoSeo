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
const tagCheerio = require('../../lib/detector/tag_cheerio');

let testerArray = [];
for (var i = 0; i < 10; i++) {
    testerArray.push(`test${i}.html`);
}

let ruleArray = [];
ruleArray.push(new tagCheerio('link', 'rel', 'dns-prefetch'));
ruleArray.push(new tagCheerio('meta', 'name', ''));
ruleArray.push(new tagCheerio('h1', '', ''));
ruleArray.push(new tagCheerio('strong', '', ''));
ruleArray.push(new tagCheerio('a', '', ''));

testerArray.forEach(tester => {
    let resolvedPath = path.resolve('./test/detector', tester);
    ruleArray.forEach(rule => {
        console.time(`Test ${tester} for ${rule.ruleName}`);
        var stream = fileToStream(resolvedPath);
        rule.count(stream, _ => console.timeEnd(`Test ${tester} for ${rule.ruleName}`));
    });
});