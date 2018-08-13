/*!
 * Test for seo_rule
 * Copyright(c) 2018 Neo Ho
 * MIT Licensed
 */

'use strict'

/**
 * Dependencies.
 */
const expect = require('chai').expect
const SeoRule = require('../lib/seo_rule')
const defaultConfigs = require('../config/default')

describe('Test for seo rule: default #1', () => {
  let config = defaultConfigs[0]
  let rule = new SeoRule(config)
  it('Detect no <img /> tag without alt attribute', () => {
    let actual = rule.getResult('<html><body><img alt="123" /></body></html>')
    expect(actual).to.equal('')
  })
  it('Detect one <img /> tag without alt attribute', () => {
    let actual = rule.getResult('<html><body><img src="123" /></body></html>')
    expect(actual).to.equal('There are 1 <img> without attribute alt in this HTML, more than 0.')
  })
  it('Detect two <img /> tags without alt attribute', () => {
    let actual = rule.getResult('<html><body><img src="123" /><img class="456"></img></body></html>')
    expect(actual).to.equal('There are 2 <img> without attribute alt in this HTML, more than 0.')
  })
})

describe('Test for seo rule: default #2', () => {
  let config = defaultConfigs[1]
  let rule = new SeoRule(config)
  it('Detect no <a /> tag without rel attribute', () => {
    let actual = rule.getResult('<html><body><a rel="123" /></body></html>')
    expect(actual).to.equal('')
  })
  it('Detect one <a /> tag without rel attribute', () => {
    let actual = rule.getResult('<html><body><a href="123" /></body></html>')
    expect(actual).to.equal('There are 1 <a> without attribute rel in this HTML, more than 0.')
  })
  it('Detect two <img /> tags without rel attribute', () => {
    let actual = rule.getResult('<html><body><a href="123" /><a>456</a></body></html>')
    expect(actual).to.equal('There are 2 <a> without attribute rel in this HTML, more than 0.')
  })
})

describe('Test for seo rule: default #3', () => {
  let config = defaultConfigs[2]
  let rule = new SeoRule(config)
  it('Detect there is no <title> tag in head', () => {
    let actual = rule.getResult('<html><head><a rel="123" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('There are 0 <title> in <head>, less than 1.')
  })
  it('Detect there is one <title> tag in head', () => {
    let actual = rule.getResult('<html><head><title>123</title></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
  it('Detect there is two <title> tag in head', () => {
    let actual = rule.getResult('<html><head><title>123</title><title>456</title></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
})

describe('Test for seo rule: default #4', () => {
  let config = defaultConfigs[3]
  let rule = new SeoRule(config)
  it('Detect there is no <meta> tag with attribute name="descriptions" in head', () => {
    let actual = rule.getResult('<html><head><a rel="123" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('There are 0 <meta> with attribute name="descriptions" in <head>, less than 1.')
  })
  it('Detect there is no <meta> tag with attribute name="descriptions" in head', () => {
    let actual = rule.getResult('<html><head><meta name="123" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('There are 0 <meta> with attribute name="descriptions" in <head>, less than 1.')
  })
  it('Detect there is at least 1 <meta> tag with attribute name="descriptions" in head', () => {
    let actual = rule.getResult('<html><head><meta name="descriptions" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
})

describe('Test for seo rule: default #5', () => {
  let config = defaultConfigs[4]
  let rule = new SeoRule(config)
  it('Detect there is no <meta> tag with attribute name="keywords" in head', () => {
    let actual = rule.getResult('<html><head><a rel="123" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('There are 0 <meta> with attribute name="keywords" in <head>, less than 1.')
  })
  it('Detect there is no <meta> tag with attribute name="keywords" in head', () => {
    let actual = rule.getResult('<html><head><meta name="descriptions" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('There are 0 <meta> with attribute name="keywords" in <head>, less than 1.')
  })
  it('Detect there is at least 1 <meta> tag with attribute name="keywords" in head', () => {
    let actual = rule.getResult('<html><head><meta name="keywords" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
})

describe('Test for seo rule: <strong> counts', () => {
  let config = defaultConfigs[5]
  let rule = new SeoRule(config)
  it('Detect that there are more than 15 <strong> tags', () => {
    let actual = rule.getResult(`<html><head><strong>1</strong></head>
    <body><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong></body></html>`)
    expect(actual).to.equal('There are 16 <strong> in this HTML, more than 15.')
  })
  it('Detect that there are 15 <strong> tags', () => {
    let actual = rule.getResult(`<html><head><strong>1</strong></head>
    <body><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong></body></html>`)
    expect(actual).to.equal('')
  })
  it('Detect that there are less than 15 <strong> tags', () => {
    let actual = rule.getResult(`<html><head></head>
    <body><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong></body></html>`)
    expect(actual).to.equal('')
  })
})

describe('Test for seo rule: <H1> counts', () => {
  let config = defaultConfigs[6]
  let rule = new SeoRule(config)
  it('Detect that there are more than 1 <H1> tag', () => {
    let actual = rule.getResult('<html><head><H1>1</H1></head><body><H1>1</H1></body></html>')
    expect(actual).to.equal('There are 2 <h1> in this HTML, more than 1.')
  })
  it('Detect that there is only 1 <H1> tag', () => {
    let actual = rule.getResult('<html><head></head><body><H1>1</H1></body></html>')
    expect(actual).to.equal('')
  })
  it('Detect that there is no <H1> tag', () => {
    let actual = rule.getResult('<html><head></head><body></body></html>')
    expect(actual).to.equal('')
  })
})
