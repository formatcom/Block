setting = require './setting'

Method = (exec, name, self) ->
  @_exec   = exec
  @_name   = name
  @_self   = self
  @_init   = false
  @_finish = false
  
  @init = (event) ->
    _obj = new Block( if typeof(event) is 'object' then event else @_self )
   
    if typeof(event) is 'function'
      _obj = setting _obj, @_self

      _obj[@_name]._init   = true
      _obj[@_name]._finish = @_self[@_name]._finish

      _obj[@_name].init   = event
      _obj[@_name].finish = @_self[@_name].finish

    return _obj

  @finish = (event) ->
    _obj = new Block( if typeof(event) is 'object' then event else @_self )

    if typeof(event) is 'function'
      _obj = setting _obj, @_self

      _obj[@_name]._init   = @_self[@_name]._init
      _obj[@_name]._finish = true

      _obj[@_name].init   = @_self[@_name].init
      _obj[@_name].finish = event

    return _obj

  return @

Method.prototype =
  query: () -> @_exec.apply @, arguments



module.exports = Method
