/*!
 * Benchmark of tag_cheerio
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Dependencies.
 */
const path = require('path')
const fileToStream = require('../../lib/io/file_to_stream')
const TagRegex = require('../../lib/detector/tag_regex')

let testerArray = []
for (var i = 0; i < 10; i++) {
  testerArray.push(`test${i}.html`)
}

let ruleArray = []
ruleArray.push(new TagRegex('link', 'rel', 'dns-prefetch'))
ruleArray.push(new TagRegex('meta', 'name', ''))
ruleArray.push(new TagRegex('h1', '', ''))
ruleArray.push(new TagRegex('strong', '', ''))
ruleArray.push(new TagRegex('a', '', ''))

testerArray.forEach(tester => {
  let resolvedPath = path.resolve('./test/detector', tester)
  ruleArray.forEach(rule => {
    console.time(`Test ${tester} for ${rule.ruleName}`)
    var stream = fileToStream(resolvedPath)
    rule.count(stream, () => console.timeEnd(`Test ${tester} for ${rule.ruleName}`))
  })
})
