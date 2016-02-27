setting = require './setting'

last = (limit=1) ->
  _obj = new Block( @_self.global.before( @_self.json() ) || @_self )
  _obj = new Block( @before( _obj.json() ) || _obj )
  

  _obj  = _obj.json()
  
  length = Object.keys(_obj).length - 1
  init = length - limit
  limit  = if init < 0 then 0 else init

  out = []
  console.log length, limit, init
  for index in [length..limit]
    console.log 'count: ', index
    out.push _obj[index]
  _obj = out

  _obj = new Block( @_self.global.after( _obj ) || _obj )
  _obj = new Block( @after( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj

module.exports = last
