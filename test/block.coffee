assert = require 'assert'
Block  = require '../src'

describe 'function prototype Block', () ->

  user = new Block()

  it 'user instance the Block', () ->

    assert.ok user instanceof Block

    assert.ok typeof user.json   is 'function'

    assert.ok typeof user.equals is 'function'
