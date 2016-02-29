Block   = require './core'
setting = require './setting'

find = (obj=false) ->
  _obj = new Block( @_self.global.before( @_self.json() ) || @_self )
  _obj = new Block( @before( _obj.json() ) || _obj )

  if obj is false
    _obj = []
    
  else if typeof(obj) is 'object'
 
    out = []
    
    for item in _obj.json()
      valid = false
      for key in Object.keys(obj)
        valid = item[key] is obj[key]
        if !valid then break

      if valid then out.push(item)

    _obj = out

  _obj = new Block _obj

  _obj = new Block( @_self.global.after( _obj.json() ) || _obj )
  _obj = new Block( @after( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj

module.exports = find
