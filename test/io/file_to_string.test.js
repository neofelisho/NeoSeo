const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const fs = require('fs')
const stream = require('stream')
const iconv = require('iconv-lite')
const fileToString = require('../../lib/io/file_to_string')

chai.use(chaiAsPromised)
var expect = chai.expect

describe('Test for file to string', () => {
  var expected = 'Hello world!'
  var testFileUtf8 = './test_for_file_to_string_utf8.txt'
  var testFileBig5 = './test_for_file_to_string_big5.txt'
  var testFileAscii = './test_for_file_to_string_Ascii.txt'
  before(() => {
    let utf8Stream = new stream.PassThrough()
    let writeUtf8Stream = fs.createWriteStream(testFileUtf8, 'utf8')
    utf8Stream.end(expected)
    utf8Stream.pipe(writeUtf8Stream)

    let asciiStream = new stream.PassThrough()
    let writeAsciiStream = fs.createWriteStream(testFileAscii, 'ascii')
    asciiStream.end(expected)
    asciiStream.pipe(writeAsciiStream)

    let big5Data = iconv.encode(expected, 'big5')
    let big5Stream = new stream.PassThrough()
    let writeBig5Stream = fs.createWriteStream(testFileBig5)
    big5Stream.end(big5Data)
    big5Stream.pipe(writeBig5Stream)
  })
  it('Read data from file with encoding utf8', () => {
    expect(fileToString(testFileUtf8)).to.eventually.equal(expected)
  })
  it('Read data from file with encoding big5', () => {
    expect(fileToString(testFileBig5)).to.eventually.equal(expected)
  })
  it('Read data from file with encoding ascii', () => {
    expect(fileToString(testFileAscii)).to.eventually.equal(expected)
  })
  it('Specific file does not exist', () => {
    expect(fileToString('./no_this_file.txt'))
      .to.be.rejected
      .then(err => {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.have.property('code', 'ENOENT')
      })
  })
  after(() => {
    fs.unlink(testFileUtf8, err => {
      if (err) console.log(err)
    })
    fs.unlink(testFileBig5, err => {
      if (err) console.log(err)
    })
    fs.unlink(testFileAscii, err => {
      if (err) console.log(err)
    })
  })
})
