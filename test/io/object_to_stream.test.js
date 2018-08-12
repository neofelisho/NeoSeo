const expect = require('chai').expect
const objectToStream = require('../lib/io/object_to_stream')
const streamToString = require('../lib/io/stream_to_string')

describe('Test for object to stream', () => {
  it('Convert `Hello world!` to stream', () => {
    let expected = 'Hello world!'
    let stream = objectToStream(expected)
    streamToString(stream, actual => {
      expect(actual).to.equal(expected)
    })
  })
  it('Convert `null` to stream', () => {
    let stream = objectToStream(null)
    streamToString(stream, actual => {
      expect(actual).to.equal(null || '')
    })
  })
  it('Convert multi-line string to stream', () => {
    let expected = `This is 1st line,
                        this is 2nd line,
                        this is last line.`
    let stream = objectToStream(expected)
    streamToString(stream, actual => {
      expect(actual).to.equal(expected)
    })
  })
})
