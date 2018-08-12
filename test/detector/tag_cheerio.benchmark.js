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
const TagCheerio = require('../../lib/detector/tag_cheerio')

let testerArray = []
for (var i = 0; i < 10; i++) {
  testerArray.push(`test${i}.html`)
}

let ruleArray = []
ruleArray.push(new TagCheerio('link', 'rel', 'dns-prefetch'))
ruleArray.push(new TagCheerio('meta', 'name', ''))
ruleArray.push(new TagCheerio('h1', '', ''))
ruleArray.push(new TagCheerio('strong', '', ''))
ruleArray.push(new TagCheerio('a', '', ''))

testerArray.forEach(tester => {
  let resolvedPath = path.resolve('./test/detector', tester)
  ruleArray.forEach(rule => {
    console.time(`Test ${tester} for ${rule.ruleName}`)
    var stream = fileToStream(resolvedPath)
    rule.count(stream, () => console.timeEnd(`Test ${tester} for ${rule.ruleName}`))
  })
})
