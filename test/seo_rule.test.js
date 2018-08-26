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

describe('Test for seo rule: default rule #0', () => {
  let config = defaultConfigs[0]
  let rule = new SeoRule(config)
  it('No <img /> tag without alt attribute', () => {
    let actual = rule.getResult('<html><body><img alt="123" /></body></html>')
    expect(actual).to.equal('')
  })
  it('One <img /> tag without alt attribute', () => {
    let actual = rule.getResult('<html><body><img src="123" /></body></html>')
    expect(actual).to.equal('There are 1 <img> without attribute alt in this HTML, more than 0.')
  })
  it('Two <img /> tags without alt attribute', () => {
    let actual = rule.getResult('<html><body><img src="123" /><img class="456"></img></body></html>')
    expect(actual).to.equal('There are 2 <img> without attribute alt in this HTML, more than 0.')
  })
})

describe('Test for seo rule: default rule #1', () => {
  let config = defaultConfigs[1]
  let rule = new SeoRule(config)
  it('No <a /> tag without rel attribute', () => {
    let actual = rule.getResult('<html><body><a rel="123" /></body></html>')
    expect(actual).to.equal('')
  })
  it('One <a /> tag without rel attribute', () => {
    let actual = rule.getResult('<html><body><a href="123" /></body></html>')
    expect(actual).to.equal('There are 1 <a> without attribute rel in this HTML, more than 0.')
  })
  it('Two <img /> tags without rel attribute', () => {
    let actual = rule.getResult('<html><body><a href="123" /><a>456</a></body></html>')
    expect(actual).to.equal('There are 2 <a> without attribute rel in this HTML, more than 0.')
  })
})

describe('Test for seo rule: default rule #2', () => {
  let config = defaultConfigs[2]
  let rule = new SeoRule(config)
  it('No <title> tag in head', () => {
    let actual = rule.getResult('<html><head><a rel="123" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('There are 0 <title> in <head>, less than 1.')
  })
  it('One <title> tag in head', () => {
    let actual = rule.getResult('<html><head><title>123</title></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
  it('Two <title> tags in head', () => {
    let actual = rule.getResult('<html><head><title>123</title><title>456</title></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
})

describe('Test for seo rule: default rule #3', () => {
  let config = defaultConfigs[3]
  let rule = new SeoRule(config)
  it('No <meta> tag with attribute name="descriptions" in head', () => {
    let actual = rule.getResult('<html><head><a rel="123" /></head><body><title>123</title><meta name="descriptions" /></body></html>')
    expect(actual).to.equal('There are 0 <meta> with attribute name="descriptions" in <head>, less than 1.')
  })
  it('No <meta> tag with attribute name="descriptions" in head', () => {
    let actual = rule.getResult('<html><head><meta name="123" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('There are 0 <meta> with attribute name="descriptions" in <head>, less than 1.')
  })
  it('One <meta> tag with attribute name="descriptions" in head', () => {
    let actual = rule.getResult('<html><head><meta name="descriptions" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
  it('Two <meta> tag with attribute name="descriptions" in head', () => {
    let actual = rule.getResult('<html><head><meta name="descriptions" /><meta name="descriptions" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
})

describe('Test for seo rule: default rule #4', () => {
  let config = defaultConfigs[4]
  let rule = new SeoRule(config)
  it('No <meta> tag with attribute name="keywords" in head', () => {
    let actual = rule.getResult('<html><head><a rel="123" /></head><body><title>123</title><meta name="keywords" /></body></html>')
    expect(actual).to.equal('There are 0 <meta> with attribute name="keywords" in <head>, less than 1.')
  })
  it('No <meta> tag with attribute name="keywords" in head', () => {
    let actual = rule.getResult('<html><head><meta name="descriptions" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('There are 0 <meta> with attribute name="keywords" in <head>, less than 1.')
  })
  it('One <meta> tag with attribute name="keywords" in head', () => {
    let actual = rule.getResult('<html><head><meta name="keywords" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
  it('Two <meta> tag with attribute name="keywords" in head', () => {
    let actual = rule.getResult('<html><head><meta name="keywords" /><meta name="keywords" /></head><body><title>123</title></body></html>')
    expect(actual).to.equal('')
  })
})

describe('Test for seo rule: default rule #5', () => {
  let config = defaultConfigs[5]
  let rule = new SeoRule(config)
  it('16 <strong> tags', () => {
    let actual = rule.getResult(`<html><head><strong>1</strong></head>
    <body><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong></body></html>`)
    expect(actual).to.equal('There are 16 <strong> in this HTML, more than 15.')
  })
  it('15 <strong> tags', () => {
    let actual = rule.getResult(`<html><head><strong>1</strong></head>
    <body><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong></body></html>`)
    expect(actual).to.equal('')
  })
  it('14 <strong> tags', () => {
    let actual = rule.getResult(`<html><head></head>
    <body><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong>
    <strong>1</strong><strong>1</strong><strong>1</strong><strong>1</strong></body></html>`)
    expect(actual).to.equal('')
  })
})

describe('Test for seo rule: default rule #6', () => {
  let config = defaultConfigs[6]
  let rule = new SeoRule(config)
  it('Two <H1> tags', () => {
    let actual = rule.getResult('<html><head><H1>1</H1></head><body><H1>1</H1></body></html>')
    expect(actual).to.equal('There are 2 <h1> in this HTML, more than 1.')
  })
  it('One <H1> tag', () => {
    let actual = rule.getResult('<html><head></head><body><H1>1</H1></body></html>')
    expect(actual).to.equal('')
  })
  it('No <H1> tag', () => {
    let actual = rule.getResult('<html><head></head><body></body></html>')
    expect(actual).to.equal('')
  })
})
