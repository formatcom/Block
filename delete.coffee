setting = require './setting'

del = (obj) ->
  _obj = new Block( @_self.global.init( @_self.json() ) || @_self )
  _obj = new Block( @init( _obj.json() ) || _obj )
  
  if typeof(obj) is 'object'
    _obj = _obj.json().filter (item) ->
    
      valid = true
    
      for key in Object.keys(obj)
        valid = item[key] != obj[key]
        if !valid then break

      if valid then return item
  else
    _obj = {}

  _obj = new Block( if Object.keys(_obj).length is 1 then _obj[0] else _obj )

  _obj = new Block( @_self.global.finish( _obj.json() ) || _obj )
  _obj = new Block( @finish( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj

module.exports = del
