assert = require 'assert'
Block  = require '../src/index.coffee'

json = [{name: 'vinicio'}, {name: 'maria'}]
user = new Block(json)

vinicio = user.all.query().json()[0].name
maria   = user.all.query().json()[1].name

describe 'All', () ->

  it 'query', () ->

    assert.equal(true, true)
