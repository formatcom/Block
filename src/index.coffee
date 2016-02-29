Block   = require './core'
Method  = require './method'
all     = require './all'
del     = require './delete'
find    = require './find'
first   = require './first'
last    = require './last'
like    = require './like'
max     = require './max'
min     = require './min'
set     = require './set'

Block.prototype._extend = () ->
 @all    = new Method all,   'all',    @
 @delete = new Method del,   'delete', @
 @find   = new Method find,  'find',   @
 @first  = new Method first, 'first',  @
 @last   = new Method last,  'last',   @
 @like   = new Method like,  'like',   @
 @max    = new Method max,   'max',    @
 @min    = new Method min,   'min',    @
 @set    = new Method set,   'set',    @


module.exports = Block
