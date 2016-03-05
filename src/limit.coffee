Block   = require './core'
setting = require './setting'

module.exports = (offset=1, limit=false) ->

  _obj = new Block( @_self.global.before( @_self.json() ) || @_self )
  _obj = new Block( @before( _obj.json() ) || _obj )
  
  offset--
  
  if no is limit
    limit  = offset+1
    offset = 0
  else
    limit += offset

  _obj  = _obj.json()
  limit = if limit > Object.keys(_obj).length then Object.keys(_obj).length else limit

  out = []
  for index in [offset...limit]
    out.push _obj[index]
  _obj = out

  _obj = new Block( @_self.global.after( _obj ) || _obj )
  _obj = new Block( @after( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj
