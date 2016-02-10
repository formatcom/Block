Block = ( obj = {} ) ->
  @_data = JSON.stringify obj
  return @


Block.prototype =
  get: -> new Block (@json())
  set: (callback) -> new Block callback( @json() )
  json: -> JSON.parse @_data
  equals: (obj) ->
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
