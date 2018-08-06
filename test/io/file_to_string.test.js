const expect = require('chai').expect;
const path = require('path');
const f2s = require('../lib/io/file_to_string');

describe('Test for file to string', () => {
  it('Read `Hello world!` from file', () => {
    let resolvedPath = path.resolve('./test/io', 'testfile.txt');
    f2s(resolvedPath, actual => {
      expect(actual).to.equal('Hello world!');
    });
  });
});