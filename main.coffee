Method  = require './Method'
all     = require './all'
set     = require './set'
del     = require './delete'
find    = require './find'


Block = ( obj = {} ) ->
  @objects = if obj.json then Object.freeze obj.json() else Object.freeze obj
  @global  = new Method new Function(), 'global', @
  @count   = 1
  @_init()
  return @

Block.prototype =
  _init: () ->
    
    @all    = new Method all,  'all',    @
    @set    = new Method set,  'set',    @
    @delete = new Method del,  'delete', @
    @find   = new Method find, 'find',   @

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

module.exports = Block
