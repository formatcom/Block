Method  = require './Method'
all     = require './all'
set     = require './set'
del     = require './delete'
find    = require './find'

SUPPORT = ['push', 'unshift', 'pop', 'shift', 'splice']

Block = ( obj = [] ) ->
  @_objects  = if obj.json then Object.freeze obj.json() else Object.freeze obj
  @global    = new Method new Function(), 'global', @
  @count     = 1
  @._support = SUPPORT.concat ['map', 'equals', 'json']
  @_init()
  return @


Block.prototype =
  _init: () ->
    
    @all    = new Method all,  'all',    @
    @set    = new Method set,  'set',    @
    @delete = new Method del,  'delete', @
    @find   = new Method find, 'find',   @

  map: () ->
    _obj = @json()
    _obj = _obj.map.apply _obj, arguments
    new Block _obj

  json: (unique=false) ->
    _obj = JSON.parse JSON.stringify @_objects
    
    if unique is true
      keys = Object.keys _obj
      if keys.length is 0 then _obj = null
      else if keys.length is 1 then _obj = _obj[keys[0]]
    
    return _obj

  equals: (obj={}, self) ->
    self = self || @json()
    x    = if obj.json then obj.json() else obj

    if x == null or x == undefined then return false

    if Object.keys(self).length != Object.keys(x).length then return false

    for key in Object.keys(self)
      if self.hasOwnProperty(key)
        if !x.hasOwnProperty(key) then return false
        
        type = typeof(self[key])

        if type == 'function' then return false
        else if type == 'object'
          if !@equals(x[key], self[key]) then return false
        else
          if self[key] != x[key] then return false

    return true

BASE = (_prop) ->
  return () ->
    _obj = @json()
    _obj[_prop].apply _obj, arguments
    new Block _obj

for prop in SUPPORT
  Block.prototype[prop] = BASE prop
    

module.exports = Block
