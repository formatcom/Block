assert = require 'assert'
Block  = require '../src'

describe 'method equals', () ->

  x = new Block([{name: 'vinicio'}])
  y = new Block([{name: 'davecas'}])
  z = [{name: 'vinicio'}]

  it 'Block(x) equals Block(y) is false', () ->

    assert.equal false, x.equals y

  it 'Block(x) equals JSON(z) is true', () ->

    assert.equal true, x.equals z

  it 'Block(x) equals STRING(davecas) is false', () ->

    assert.equal false, x.equals 'davecas'

  it 'Block(x) equals FUNCTION() is false', () ->

    assert.equal false, x.equals new Function()



