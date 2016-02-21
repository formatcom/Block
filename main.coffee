Block = ( obj = {} ) ->
  @objects = if obj.json then Object.freeze obj.json() else Object.freeze obj
  @_init()
  return @

Block.prototype =
  _init: () ->

    self = @

    @all = () ->
      _obj = new Block( @all.init( @json() ) || @ )
      _obj = new Block( @all.finish( _obj.json() ) || @ )
      _obj.all.init   = @all.init
      _obj.all.finish = @all.finish
      return _obj

    @all.init = (event) ->
      _obj = new Block( if typeof(event) == "object" then event else self )
     
      if typeof(event) == 'function'
        _obj.all.init = event

      return _obj

    @all.finish = (event) ->
      _obj = new Block( if typeof(event) == "object" then event else self )
    
      if typeof(event) == 'function'
        _obj.all.finish = event
    
      return _obj


    @set = (callback) ->
      _obj = new Block( @set.init( @json() ) || @ )
      _obj = new Block( callback( _obj.json() ) || @ )
      _obj = new Block( @set.finish( _obj.json() ) || @ )
      _obj.set.init   = @set.init
      _obj.set.finish = @set.finish

      return _obj

    @set.init = (event) ->
      _obj = new Block( if typeof(event) == "object" then event else self )
     
      if typeof(event) == 'function'
        _obj.set.init = event

      return _obj

    @set.finish = (event) ->
      _obj = new Block( if typeof(event) == "object" then event else self )
    
      if typeof(event) == 'function'
        _obj.set.finish = event
    
      return _obj


    @delete = (obj={}) ->
      _obj = new Block( @delete.init( @json() ) || @ )
      _obj = _obj.json().filter (item) ->
        
        valid = true
        
        for key in Object.keys(obj)
          valid = item[key] != obj[key]
          if !valid then break

        if valid then return item
      
      _obj = new Block _obj

      _obj = new Block( @delete.finish( _obj.json() ) || @ )
      _obj.delete.init   = @delete.init
      _obj.delete.finish = @delete.finish

      return _obj

    @delete.init = (event) ->
      _obj = new Block( if typeof(event) == "object" then event else self )
     
      if typeof(event) == 'function'
        _obj.delete.init = event

      return _obj

    @delete.finish = (event) ->
      _obj = new Block( if typeof(event) == "object" then event else self )
    
      if typeof(event) == 'function'
        _obj.delete.finish = event
    
      return _obj



    @find = (obj={}) ->
      _obj = new Block( @find.init( @json() ) || @ )
      _obj = _obj.json().filter (item) ->
        
        valid = true
        
        for key in Object.keys(obj)
          valid = item[key] == obj[key]
          if !valid then break

        if valid then return item
      
      _obj = new Block _obj
      _obj = new Block( @find.finish( _obj.json() ) || @ )
      _obj.find.init   = @find.init
      _obj.find.finish = @find.finish

      return _obj

    @find.init = (event) ->
      _obj = new Block( if typeof(event) == "object" then event else self )
     
      if typeof(event) == 'function'
        _obj.find.init = event

      return _obj

    @find.finish = (event) ->
      _obj = new Block( if typeof(event) == "object" then event else self )
    
      if typeof(event) == 'function'
        _obj.find.finish = event
    
      return _obj


  json: -> JSON.parse JSON.stringify @objects
  equals: (obj={}) ->
    self = @json()
    x    = if obj.json then obj.json() else obj

    if x == null or x == undefined then return false

    if Object.keys(self).length != Object.keys(x).length then return false

    for prop in self
      if self.hasOwnProperty(prop)
        if !x.hasOwnProperty(prop) then return false
        
        type = typeof(self[prop])

        if type == 'function' then return false
        else if type == 'object'
          if !self[prop].equals(x[prop]) then return false
        else
          if self[prop] != x[prop] then return false

    return true

module.exports =
  Block
