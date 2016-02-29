Block   = require './core'
setting = require './setting'

like = (obj = false, flags='') ->
  _obj = new Block( @_self.global.before( @_self.json() ) || @_self )
  _obj = new Block( @before( _obj.json() ) || _obj ).json()

  if obj == false
    _obj = []
  
  else if typeof(obj) is 'object'

    out = []
    
    for item in _obj
      valid = false
      for key in Object.keys(obj)

        valid = item[key].search( new RegExp(obj[key], flags) )
        if valid == -1 then break

      if valid != -1 then out.push(item)

    _obj = out

   

  _obj = new Block( @_self.global.after( _obj ) || _obj )
  _obj = new Block( @after( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj

module.exports = like
