Block   = require './core'
setting = require './setting'

max = (attrb) ->
  _obj = new Block( @_self.global.before( @_self.json() ) || @_self )
  _obj = new Block( @before( _obj.json() ) || _obj )

  _obj = _obj.json().sort( (objA, objB) -> objB[attrb] - objA[attrb] )

  _obj = new Block( @_self.global.after( _obj ) || _obj )
  _obj = new Block( @after( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj

module.exports = max
