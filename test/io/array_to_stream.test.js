const chai = require('chai')
const os = require('os')
const arrayToStream = require('../../lib/io/array_to_stream')
const streamToString = require('../../lib/io/stream_to_string')

var expect = chai.expect

describe('Test for array to stream', () => {
  it('Test string array', () => {
    let expected = ['Hello world!', 'Hello my friend.']
    arrayToStream(expected).then(stream => {
      streamToString(stream, data => {
        let actual = data.split(os.EOL)
        actual = actual.filter(a => a !== '')
        expect(actual).to.be.eql(expected)
      })
    })
  })
  it('Test int array', () => {
    let expected = [1, 3, 5, 7, 999]
    arrayToStream(expected).then(stream => {
      streamToString(stream, data => {
        let actual = data.split(os.EOL)
        actual = actual.filter(a => a !== '').map(value => parseInt(value))
        expect(actual).to.be.eql(expected)
      })
    })
  })
  it('Test empty array', () => {
    let expected = []
    arrayToStream(expected).then(stream => {
      streamToString(stream, data => {
        let actual = data.split(os.EOL)
        actual = actual.filter(a => a !== '')
        expect(actual).to.be.eql(expected)
      })
    })
  })
  it('Test null object', () => {
    arrayToStream()
      .then(() => {})
      .catch(err => {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.have.property('message', 'Parameter `array` should be an `Array`')
      })
  })
})
