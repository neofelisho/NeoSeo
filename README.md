# NeoSeo

SEO defects detector for [node.js](http://nodejs.org).

```js
var NeoSeo = require('neo-seo')

var customConfigs =  [
  {
    'ruleName': 'Rule: link with rel',
    'tag': 'link',
    'attributeName': 'rel',
    'attributeType': 'with',
    'minimum': 0
  },
  {
    'ruleName': 'Rule: div with class d-flex'
    'root': 'body',
    'tag': 'div',
    'attributeName': 'class',
    'attributeValue': 'd-flex',
    'attributeType': 'with',
    'minimum': 2,
    'maximum': 8
  }
]
var disableList = [0, 1, 2]
var app = new NeoSeo(customConfigs, disableList)
// or use default settings
// var app = new NeoSeo()

var input = 'file_to_run_seo.html'
var output = 'export_report.txt'
app.getResult(input, output)
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install neo-seo
```

## Features

  * Input could be a file (HTML or txt), a Node Readable Stream, or a URL (http or https).
  * Output coule be a file (string path), a Node Writable Stream, or a function such as Consoel.log.
  * Build-in seven seo rules, and user could turn-off some of them.
  * High flexibility custom rule by custom configuration setting.
  * High test coverage

## Docs

### Input

  * Use a file path as input:
    ```js
    var input = 'file_to_run_seo.html'
    ```
  * Use a Node Readable Stream:
    ```js
    var input = fs.CreateReadStream()
    ```
    or
    ```js
    var input = new stream.Readable()
    input.push('some data need to run seo')
    input.push(null)
    ```
  * Use a URL
    ```js
    var input = 'http://some-url.to.run.seo/
    ```
    or
    ```js
    var input = 'https://https-url.to.run.seo/
    ```

### Output

  * Use a file path as output:
    ```js
    var output = 'export_file.txt'
    ```
  * Use a Node Writable Stream:
    ```js
    var output = fs.CreateWriteStream()
    ```
    or
    ```js
    var output = process.stdout
    ```
  * Use a Node function
    ```js
    var output = console.log
    ```

### Rule Configuration Setting

  * Template
    ```js
    {
      'ruleName': 'The name of this rule',
      'root': 'head',
      'tag': 'meta',
      'attributeName': 'name',
      'attributeValue': 'descriptions',
      'attributeType': 'with',
      'minimum': null,
      'maximum': 1
    }
    ```
  * Property
    * `ruleName`: The name of this rule, which will show in the output message. User can use ruleName to disable default rules. (optional)
    * `root`: The html section this rule will apply. For example, `head` means only search the head, and `body` means only search the body. `NULL` means search the whole html file or data. (optional)
    * `tag`: Which html tag we want to find. **(required)**
    * `attributeName`: Which attribute in the tag we want to find. (optional)
    * `attributeValue`: Which value of the attribute we want to find. (optional)
    * `attributeType`: If we want to find the tag `with` specific attribute, use `with` here. Otherwise, use `without` to get the opposite results. (optional)
    * `minimum` and `maximum`: Use these two numbers to define when this rule will be effective. For example, `'minimum': null` and `'maximum': 1` means we want to check if this html file (or data) has less than 1 match. **These two numbers are exclusively!**

  * Example
    * Using heading tag appropriately is good. We want to check if there are `<h2>` tags in `<body>` section, and we hope there is at least one `<h2>` tag, but no more than 5.
      ```js
      {
        'ruleName': 'Rule H2',
        'root': 'body',
        'tag': 'h2',
        'minimum': 0,
        'maximum': 5
      }
      ```

## Tests

```bash
$ npm install
$ npm test
```

## ToDo

* More integration test cases about different input and output.
* More efficient way to parse html file (or data). I try to use `regular expression`, it runs more quickly than `cheerio.js` (run some benchmarks). But I encountered problem in `tags or attributes with line breaker`. Some other npm packages which are used to parse html have the same problem.
* Better architecture...maybe after I study these three topics, I can it better.
  * EventEmitter
  * Stream
  * Design Patterns in Node.js
