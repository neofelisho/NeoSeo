const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const stringToStream = require('../../lib/io/string_to_stream')
const streamToString = require('../../lib/io/stream_to_string')

chai.use(chaiAsPromised)
var expect = chai.expect

describe('Test for string to stream', () => {
  it('Test single-line string', () => {
    let expected = 'Hello world!'
    stringToStream(expected).then(stream => {
      streamToString(stream, actual => {
        expect(actual).to.be.equal(expected)
      })
    })
  })
  it('Test multi-line string', () => {
    let expected = `Hello world!
                    Hello my friend.
                    Love and peace.`
    stringToStream(expected).then(stream => {
      streamToString(stream, actual => {
        expect(actual).to.be.equal(expected)
      })
    })
  })
  it('Test empty string', () => {
    stringToStream('')
      .then(() => {})
      .catch(err => {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.have.property('message', 'Parameter `str` should be an `string`')
      })
  })
  it('Test null object', () => {
    stringToStream()
      .then(() => {})
      .catch(err => {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.have.property('message', 'Parameter `str` should be an `string`')
      })
  })
})
