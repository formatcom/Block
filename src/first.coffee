Block   = require './core'
setting = require './setting'

first = (limit=1) ->
  _obj = new Block( @_self.global.before( @_self.json() ) || @_self )
  _obj = new Block( @before( _obj.json() ) || _obj )
  

  _obj  = _obj.json()
  limit = if limit > Object.keys(_obj).length then Object.keys(_obj).length else limit

  out = []
  for index in [0...limit]
    out.push _obj[index]
  _obj = out

  _obj = new Block( @_self.global.after( _obj ) || _obj )
  _obj = new Block( @after( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj

module.exports = first
