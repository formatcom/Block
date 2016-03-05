// Generated by CoffeeScript 1.10.0
(function() {
  var Block, Method, all, del, find, first, last, like, limit, max, min, set;

  Block = require('./core');

  Method = require('./method');

  all = require('./all');

  del = require('./delete');

  find = require('./find');

  first = require('./first');

  last = require('./last');

  like = require('./like');

  max = require('./max');

  min = require('./min');

  set = require('./set');

  limit = require('./limit');

  Block.prototype._extend = function() {
    this.global = new Method(new Function(), 'global', this);
    this.all = new Method(all, 'all', this);
    this["delete"] = new Method(del, 'delete', this);
    this.find = new Method(find, 'find', this);
    this.first = new Method(first, 'first', this);
    this.last = new Method(last, 'last', this);
    this.like = new Method(like, 'like', this);
    this.max = new Method(max, 'max', this);
    this.min = new Method(min, 'min', this);
    this.set = new Method(set, 'set', this);
    return this.limit = new Method(limit, 'limit', this);
  };

  module.exports = Block;

}).call(this);
