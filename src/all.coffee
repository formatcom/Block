setting = require './setting'

all = () ->
  _obj = new Block( @_self.global.before( @_self.json() ) || @_self )
  _obj = new Block( @before( _obj.json() ) || _obj )
  _obj = new Block( @_self.global.after( _obj.json() ) || _obj )
  _obj = new Block( @after( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj

module.exports = all
