setting = require './setting'

Method = (exec, name, self) ->
  @_exec   = exec
  @_name   = name
  @_self   = self
  @_before = false
  @_after  = false
  
  @before = (event) ->
    _obj = new Block( if typeof(event) is 'object' then event else @_self )
   
    if typeof(event) is 'function'
      _obj = setting _obj, @_self

      _obj[@_name]._before = true
      _obj[@_name]._after  = @_self[@_name]._after

      _obj[@_name].before   = event
      _obj[@_name].after = @_self[@_name].after

    return _obj

  @after = (event) ->
    _obj = new Block( if typeof(event) is 'object' then event else @_self )

    if typeof(event) is 'function'
      _obj = setting _obj, @_self

      _obj[@_name]._before = @_self[@_name]._before
      _obj[@_name]._after  = true

      _obj[@_name].before = @_self[@_name].before
      _obj[@_name].after  = event

    return _obj

  return @

Method.prototype =
  query: () -> @_exec.apply @, arguments



module.exports = Method
