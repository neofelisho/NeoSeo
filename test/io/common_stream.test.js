const chai = require('chai')
const stream = require('stream')
const commonStream = require('../../lib/io/common_stream')

var expect = chai.expect

describe('Test for common methods of stream', () => {
  let expected = 'Hello world!'
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
  it('Test passthrough stream for `isReadable`', () => expect(commonStream.isReadableStream(passthroughStream)).to.be.true)
  it('Test passthrough stream for `isWritable`', () => expect(commonStream.isWritableStream(passthroughStream)).to.be.true)
  it('Test readable stream for `isReadable`', () => expect(commonStream.isReadableStream(readableStream)).to.be.true)
  it('Test readable stream for `isWritable`', () => expect(commonStream.isWritableStream(readableStream)).to.be.false)
  it('Test duplex stream for `isReadable`', () => expect(commonStream.isReadableStream(duplexStream)).to.be.true)
  it('Test duplex stream for `isWritable`', () => expect(commonStream.isWritableStream(duplexStream)).to.be.true)
  it('Test transform stream for `isReadable`', () => expect(commonStream.isReadableStream(transformStream)).to.be.true)
  it('Test transform stream for `isWritable`', () => expect(commonStream.isWritableStream(transformStream)).to.be.true)
  it('Test writable stream for `isReadable`', () => expect(commonStream.isReadableStream(writableStream)).to.be.false)
  it('Test writable stream for `isWritable`', () => expect(commonStream.isWritableStream(writableStream)).to.be.true)
  after(() => {
    passthroughStream.destroy()
    readableStream.destroy()
    duplexStream.destroy()
    transformStream.destroy()
    writableStream.destroy()
  })
})
