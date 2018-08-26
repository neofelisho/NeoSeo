const chai = require('chai')
const os = require('os')
const NeoSeo = require('../lib/neo_seo')
const fileToString = require('../lib/io/file_to_string')

var expect = chai.expect

let detector = new NeoSeo()
let inputFile = './test/testdata.html'
let outputFile = './test/output_file.txt'
let expected = [
  '<a /> tag without rel attribute: There are 52 <a> without attribute rel in this HTML, more than 0.',
  'No <meta> tag with name="description" attribute in <haed>: There are 0 <meta> with attribute name="descriptions" in <head>, less than 1.',
  'No <meta> tag with name="keywords" attribute in <haed>: There are 0 <meta> with attribute name="keywords" in <head>, less than 1.'
]

describe('Test for detector with default configs', () => {
  it('Input a html file, and output result as file', () => {
    detector.getResult(inputFile, outputFile, (err, result) => {
      if (err)console.log(err)
      console.log(result)
    })
    fileToString(outputFile, err => { if (err) console.log(err) })
      .then(data => {
        let actual = data.split(os.EOL).filter(r => r !== '')
        expect(actual).to.be.eql(expected)
      })
  })
})
