// Generated by CoffeeScript 1.10.0
(function() {
  var Block, last, setting;

  Block = require('./core');

  setting = require('./setting');

  last = function(limit) {
    var _obj, i, index, init, length, out, ref, ref1;
    if (limit == null) {
      limit = 1;
    }
    _obj = new Block(this._self.global.before(this._self.json()) || this._self);
    _obj = new Block(this.before(_obj.json()) || _obj);
    _obj = _obj.json();
    length = Object.keys(_obj).length - 1;
    init = length - limit;
    limit = init < -1 ? -1 : init;
    out = [];
    for (index = i = ref = length, ref1 = limit; ref <= ref1 ? i < ref1 : i > ref1; index = ref <= ref1 ? ++i : --i) {
      out.push(_obj[index]);
    }
    _obj = out;
    _obj = new Block(this._self.global.after(_obj) || _obj);
    _obj = new Block(this.after(_obj.json()) || _obj);
    _obj = setting(_obj, this._self);
    return _obj;
  };

  module.exports = last;

}).call(this);
