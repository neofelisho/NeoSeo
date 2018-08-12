const expect = require('chai').expect
const path = require('path')
const fileToStream = require('../lib/io/file_to_stream')
const streamToString = require('../lib/io/stream_to_string')
const fileToString = require('../lib/io/file_to_string')

describe('Test for file to stream', () => {
  it('test file', () => {
    let resolvedPath = path.resolve('./test/io', 'testfile.txt')
    fileToString(resolvedPath, expected => {
      let stream = fileToStream(resolvedPath)
      streamToString(stream, actual => {
        expect(actual).to.equal(expected)
      })
    })
  })
})
