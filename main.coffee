Method  = require './Method'
all     = require './all'
set     = require './set'
del     = require './delete'
find    = require './find'

SUPPORT_MUTABLE_BLOCK   = ['push', 'unshift']
SUPPORT_MUTABLE         = ['pop', 'shift', 'splice', 'sort', 'reverse']
SUPPORT_IMMUTABLE_BLOCK = ['concat']
SUPPORT_IMMUTABLE       = ['map', 'filter', 'forEach']

Block = ( obj = [] ) ->
  @_objects        = if obj.json then Object.freeze obj.json() else Object.freeze obj
  @global          = new Method new Function(), 'global', @
  @count           = 1
  @._support       = SUPPORT_MUTABLE.concat SUPPORT_IMMUTABLE.concat ['json']
  @._support_block = SUPPORT_MUTABLE_BLOCK.concat SUPPORT_IMMUTABLE_BLOCK.concat ['equals']
  @_init()
  return @


Block.prototype =
  _init: () ->
    
    @all    = new Method all,  'all',    @
    @set    = new Method set,  'set',    @
    @delete = new Method del,  'delete', @
    @find   = new Method find, 'find',   @

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

BASE = (_prop, _immutable=false, block=true) ->
  return () ->
    _obj  = @json()
    
    if block is true
      _args = []
      for key in Object.keys arguments
        item = arguments[key]
        
        if item.json
          item = item.json()
          for index in Object.keys item
            _args.push item[index]
        
        else
          _args.push item
    else
      _args = arguments
    
    if _immutable then _obj = _obj[_prop].apply _obj, _args else _obj[_prop].apply _obj, _args
    new Block _obj


for prop in SUPPORT_MUTABLE_BLOCK
  Block.prototype[prop] = BASE prop, false, true

for prop in SUPPORT_MUTABLE
  Block.prototype[prop] = BASE prop, false, false
    
for prop in SUPPORT_IMMUTABLE_BLOCK
  Block.prototype[prop] = BASE prop, true, true

for prop in SUPPORT_IMMUTABLE
  Block.prototype[prop] = BASE prop, true, false

module.exports = Block
