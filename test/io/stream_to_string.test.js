const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const stream = require('stream')
const streamToString = require('../../lib/io/stream_to_string')

chai.use(chaiAsPromised)
var expect = chai.expect

describe('Test for file to string', () => {
  let expected = 'Hello world!'
  let errmsg = 'Parameter `stream` should be a `ReadableStream`.'
  let passthroughStream = new stream.PassThrough()
  let readableStream = new stream.Readable()
  let duplexStream = new stream.Duplex()
  let transformStream = new stream.Transform()
  let writableStream = new stream.Writable()
  before(() => {
    passthroughStream.end(expected)

    readableStream.push(expected)
    readableStream.push(null)

    duplexStream.push(expected)
    duplexStream.push(null)

    transformStream.push(expected)
    transformStream.push(null)

    writableStream._write = () => {}
    let tempStream = new stream.PassThrough()
    tempStream.end(expected)
    tempStream.pipe(writableStream)
  })
  it('Read data from passthrough stream', () => {
    expect(streamToString(passthroughStream)).to.eventually.equal(expected)
  })
  it('Read data from readable stream', () => {
    expect(streamToString(readableStream)).to.eventually.equal(expected)
  })
  it('Read data from duplex stream', () => {
    expect(streamToString(duplexStream)).to.eventually.equal(expected)
  })
  it('Read data from transform stream', () => {
    expect(streamToString(transformStream)).to.eventually.equal(expected)
  })
  it('Read data from writable stream', () => {
    expect(streamToString(writableStream))
      .to.be.rejected
      .then(err => {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.have.property('message', errmsg)
      })
  })
  it('Input is a null object', () => {
    expect(streamToString(null))
      .to.be.rejected
      .then(err => {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.have.property('message', errmsg)
      })
  })
})
