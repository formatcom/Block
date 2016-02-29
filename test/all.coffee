assert = require 'assert'
Block  = require '../src'

describe 'All Query', () ->

  json = [{name: 'vinicio'}, {name: 'maria'}]
  user = new Block(json)

  it 'all methods ok', () ->

    assert.ok(user.all)
    assert.ok(typeof user.all is 'object')

    assert.ok(user.all.before)
    assert.ok(typeof user.all.before is 'function')
    assert.ok(user.all.query)
    assert.ok(typeof user.all.query is 'function')
    assert.ok(user.all.after)
    assert.ok(typeof user.all.after is 'function')

  it 'query', () ->

    allQuery = user.all.query()

    assert.equal(json[0].name, allQuery.json()[0].name)
    assert.equal(json[1].name, allQuery.json()[1].name)

  it 'before arg -> function', () ->

    allQuery = user.all.query().json().length

    userBefore = user.all.before (list_user) ->
      list_user.push({name: 'ghost'})
      return list_user
  
    allBeforeQuery = userBefore.all.query().json().length

    assert.equal false, user.all._before
    assert.equal true,  userBefore.all._before
    assert.equal allQuery, 2
    assert.equal allBeforeQuery, 3

  it 'after arg -> function', () ->

    allQuery = user.all.query().json().length

    userAfter = user.all.after (list_user) ->
      list_user.pop()
      return list_user
  
    allAfterQuery = userAfter.all.query().json().length

    assert.equal false, user.all._after
    assert.equal true,  userAfter.all._after
    assert.equal allQuery, 2
    assert.equal allAfterQuery, 1
