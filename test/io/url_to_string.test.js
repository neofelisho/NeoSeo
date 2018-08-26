const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const http = require('http')
const https = require('https')
const urlToString = require('../../lib/io/url_to_string')

chai.use(chaiAsPromised)
var expect = chai.expect

describe('Test for url to string', () => {
  let expected = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Hello world!</title>
    </head>
    <body>
      <h1>hello my friend.</h1>
    </body>
  </html>`
  let server1, server2, server3
  before(() => {
    server1 = http.createServer((req, res) => {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(expected)
      res.end()
    })
    server1 = require('http-shutdown')(server1)
    server1.listen(17000)

    server2 = https.createServer((req, res) => {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(expected)
      res.end()
    })
    server2 = require('http-shutdown')(server2)
    server2.listen(17001)

    server3 = https.createServer((req, res) => {
      res.writeHead(404, {'Content-Type': 'text/html'})
      res.write('not found')
      res.end()
    })
    server3 = require('http-shutdown')(server3)
    server3.listen(17002)
  })
  it('Get data from http server', () => {
    expect(urlToString('http://localhost:17000/')).to.eventually.equal(expected)
  })
  it('Get data from http server', () => {
    expect(urlToString('https://localhost:17001/')).to.eventually.equal(expected)
  })
  it('Url does not exist', () => {
    expect(urlToString('https://localhost:17002/'))
      .to.be.rejected
      .then(err => {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.have.property('code', 'ECONNRESET')
      })
  })
  after(() => {
    server1.shutdown()
    server2.shutdown()
    server3.shutdown()
  })
})
