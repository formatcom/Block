(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Block = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Block, all, setting;

Block = require('./core');

setting = require('./setting');

all = function() {
  var _obj;
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj);
  _obj = new Block(this._self.global.after(_obj.json()) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = all;


},{"./core":2,"./setting":14}],2:[function(require,module,exports){
var BASE, Block, SUPPORT_IMMUTABLE, SUPPORT_IMMUTABLE_BLOCK, SUPPORT_MUTABLE, SUPPORT_MUTABLE_BLOCK, i, j, k, l, len, len1, len2, len3, prop;

SUPPORT_MUTABLE_BLOCK = ['push', 'unshift'];

SUPPORT_MUTABLE = ['pop', 'shift', 'splice', 'sort', 'reverse'];

SUPPORT_IMMUTABLE_BLOCK = ['concat'];

SUPPORT_IMMUTABLE = ['map', 'filter', 'forEach'];

Block = function(obj) {
  if (obj == null) {
    obj = [];
  }
  this._objects = obj.json ? Object.freeze(obj.json()) : Object.freeze(obj);
  this._support = SUPPORT_MUTABLE.concat(SUPPORT_IMMUTABLE.concat(['json']));
  this._support_block = SUPPORT_MUTABLE_BLOCK.concat(SUPPORT_IMMUTABLE_BLOCK.concat(['equals']));
  this._extend();
  return this;
};

Block.prototype = {
  _extend: function() {},
  json: function(unique) {
    var _obj, keys;
    if (unique == null) {
      unique = false;
    }
    _obj = JSON.parse(JSON.stringify(this._objects));
    if (unique === true) {
      keys = Object.keys(_obj);
      if (keys.length === 0) {
        _obj = null;
      } else if (keys.length === 1) {
        _obj = _obj[keys[0]];
      }
    }
    return _obj;
  },
  equals: function(obj, self) {
    var i, key, len, ref, type, x;
    if (obj == null) {
      obj = {};
    }
    self = self || this.json();
    x = obj.json ? obj.json() : obj;
    if (x === null || x === void 0) {
      return false;
    }
    if (Object.keys(self).length !== Object.keys(x).length) {
      return false;
    }
    ref = Object.keys(self);
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      if (self.hasOwnProperty(key)) {
        if (!x.hasOwnProperty(key)) {
          return false;
        }
        type = typeof self[key];
        if (type === 'function') {
          return false;
        } else if (type === 'object') {
          if (!this.equals(x[key], self[key])) {
            return false;
          }
        } else {
          if (self[key] !== x[key]) {
            return false;
          }
        }
      }
    }
    return true;
  }
};

BASE = function(_prop, _immutable, block) {
  if (_immutable == null) {
    _immutable = false;
  }
  if (block == null) {
    block = true;
  }
  return function() {
    var _args, _obj, i, index, item, j, key, len, len1, ref, ref1;
    _obj = this.json();
    if (block === true) {
      _args = [];
      ref = Object.keys(arguments);
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        item = arguments[key];
        if (item.json) {
          item = item.json();
          ref1 = Object.keys(item);
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            index = ref1[j];
            _args.push(item[index]);
          }
        } else {
          _args.push(item);
        }
      }
    } else {
      _args = arguments;
    }
    if (_immutable) {
      _obj = _obj[_prop].apply(_obj, _args);
    } else {
      _obj[_prop].apply(_obj, _args);
    }
    return new Block(_obj);
  };
};

for (i = 0, len = SUPPORT_MUTABLE_BLOCK.length; i < len; i++) {
  prop = SUPPORT_MUTABLE_BLOCK[i];
  Block.prototype[prop] = BASE(prop, false, true);
}

for (j = 0, len1 = SUPPORT_MUTABLE.length; j < len1; j++) {
  prop = SUPPORT_MUTABLE[j];
  Block.prototype[prop] = BASE(prop, false, false);
}

for (k = 0, len2 = SUPPORT_IMMUTABLE_BLOCK.length; k < len2; k++) {
  prop = SUPPORT_IMMUTABLE_BLOCK[k];
  Block.prototype[prop] = BASE(prop, true, true);
}

for (l = 0, len3 = SUPPORT_IMMUTABLE.length; l < len3; l++) {
  prop = SUPPORT_IMMUTABLE[l];
  Block.prototype[prop] = BASE(prop, true, false);
}

module.exports = Block;


},{}],3:[function(require,module,exports){
var Block, del, setting;

Block = require('./core');

setting = require('./setting');

del = function(obj) {
  var _obj, i, item, j, key, len, len1, out, ref, ref1, valid;
  if (obj == null) {
    obj = false;
  }
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj);
  if (obj === false) {
    _obj = [];
  } else if (typeof obj === 'object') {
    out = [];
    ref = _obj.json();
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      valid = false;
      ref1 = Object.keys(obj);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        key = ref1[j];
        valid = item[key] !== obj[key];
        if (!valid) {
          break;
        }
      }
      if (valid) {
        out.push(item);
      }
    }
    _obj = out;
  }
  _obj = new Block(_obj);
  _obj = new Block(this._self.global.after(_obj.json()) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = del;


},{"./core":2,"./setting":14}],4:[function(require,module,exports){
var Block, find, setting;

Block = require('./core');

setting = require('./setting');

find = function(obj) {
  var _obj, i, item, j, key, len, len1, out, ref, ref1, valid;
  if (obj == null) {
    obj = false;
  }
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj);
  if (obj === false) {
    _obj = [];
  } else if (typeof obj === 'object') {
    out = [];
    ref = _obj.json();
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      valid = false;
      ref1 = Object.keys(obj);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        key = ref1[j];
        valid = item[key] === obj[key];
        if (!valid) {
          break;
        }
      }
      if (valid) {
        out.push(item);
      }
    }
    _obj = out;
  }
  _obj = new Block(_obj);
  _obj = new Block(this._self.global.after(_obj.json()) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = find;


},{"./core":2,"./setting":14}],5:[function(require,module,exports){
var Block, first, setting;

Block = require('./core');

setting = require('./setting');

first = function(limit) {
  var _obj, i, index, out, ref;
  if (limit == null) {
    limit = 1;
  }
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj);
  _obj = _obj.json();
  limit = limit > Object.keys(_obj).length ? Object.keys(_obj).length : limit;
  out = [];
  for (index = i = 0, ref = limit; 0 <= ref ? i < ref : i > ref; index = 0 <= ref ? ++i : --i) {
    out.push(_obj[index]);
  }
  _obj = out;
  _obj = new Block(this._self.global.after(_obj) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = first;


},{"./core":2,"./setting":14}],6:[function(require,module,exports){
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


},{"./all":1,"./core":2,"./delete":3,"./find":4,"./first":5,"./last":7,"./like":8,"./limit":9,"./max":10,"./method":11,"./min":12,"./set":13}],7:[function(require,module,exports){
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


},{"./core":2,"./setting":14}],8:[function(require,module,exports){
var Block, like, setting;

Block = require('./core');

setting = require('./setting');

like = function(obj, flags) {
  var _obj, i, item, j, key, len, len1, out, ref, valid;
  if (obj == null) {
    obj = false;
  }
  if (flags == null) {
    flags = '';
  }
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj).json();
  if (obj === false) {
    _obj = [];
  } else if (typeof obj === 'object') {
    out = [];
    for (i = 0, len = _obj.length; i < len; i++) {
      item = _obj[i];
      valid = false;
      ref = Object.keys(obj);
      for (j = 0, len1 = ref.length; j < len1; j++) {
        key = ref[j];
        valid = item[key].search(new RegExp(obj[key], flags));
        if (valid === -1) {
          break;
        }
      }
      if (valid !== -1) {
        out.push(item);
      }
    }
    _obj = out;
  }
  _obj = new Block(this._self.global.after(_obj) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = like;


},{"./core":2,"./setting":14}],9:[function(require,module,exports){
var Block, setting;

Block = require('./core');

setting = require('./setting');

module.exports = function(offset, limit) {
  var _obj, i, index, out, ref, ref1;
  if (offset == null) {
    offset = 1;
  }
  if (limit == null) {
    limit = false;
  }
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj);
  offset--;
  if (false === limit) {
    limit = offset + 1;
    offset = 0;
  } else {
    limit += offset;
  }
  _obj = _obj.json();
  limit = limit > Object.keys(_obj).length ? Object.keys(_obj).length : limit;
  console.log('offset: ', offset, 'limit: ', limit);
  out = [];
  for (index = i = ref = offset, ref1 = limit; ref <= ref1 ? i < ref1 : i > ref1; index = ref <= ref1 ? ++i : --i) {
    out.push(_obj[index]);
  }
  _obj = out;
  _obj = new Block(this._self.global.after(_obj) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};


},{"./core":2,"./setting":14}],10:[function(require,module,exports){
var Block, max, setting;

Block = require('./core');

setting = require('./setting');

max = function(attrb) {
  var _obj;
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj);
  _obj = _obj.json().sort(function(objA, objB) {
    return objB[attrb] - objA[attrb];
  });
  _obj = new Block(this._self.global.after(_obj) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = max;


},{"./core":2,"./setting":14}],11:[function(require,module,exports){
var Block, Method, setting;

Block = require('./core');

setting = require('./setting');

Method = function(exec, name, self) {
  this._exec = exec;
  this._name = name;
  this._self = self;
  this._before = false;
  this._after = false;
  this.before = function(event) {
    var _obj;
    _obj = new Block(typeof event === 'object' ? event : this._self);
    if (typeof event === 'function') {
      _obj = setting(_obj, this._self);
      _obj[this._name]._before = true;
      _obj[this._name]._after = this._self[this._name]._after;
      _obj[this._name].before = event;
      _obj[this._name].after = this._self[this._name].after;
    }
    return _obj;
  };
  this.after = function(event) {
    var _obj;
    _obj = new Block(typeof event === 'object' ? event : this._self);
    if (typeof event === 'function') {
      _obj = setting(_obj, this._self);
      _obj[this._name]._before = this._self[this._name]._before;
      _obj[this._name]._after = true;
      _obj[this._name].before = this._self[this._name].before;
      _obj[this._name].after = event;
    }
    return _obj;
  };
  return this;
};

Method.prototype = {
  query: function() {
    return this._exec.apply(this, arguments);
  }
};

module.exports = Method;


},{"./core":2,"./setting":14}],12:[function(require,module,exports){
var Block, min, setting;

Block = require('./core');

setting = require('./setting');

min = function(attrb) {
  var _obj;
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj);
  _obj = _obj.json().sort(function(objA, objB) {
    return objA[attrb] - objB[attrb];
  });
  _obj = new Block(this._self.global.after(_obj) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = min;


},{"./core":2,"./setting":14}],13:[function(require,module,exports){
var Block, set, setting;

Block = require('./core');

setting = require('./setting');

set = function(callback) {
  var _obj;
  if (callback == null) {
    callback = new Function();
  }
  _obj = new Block(this._self.global.before(this._self.json()) || this._self);
  _obj = new Block(this.before(_obj.json()) || _obj);
  _obj = new Block(callback(_obj.json()) || _obj);
  _obj = new Block(this._self.global.after(_obj.json()) || _obj);
  _obj = new Block(this.after(_obj.json()) || _obj);
  _obj.count += this._self.count;
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = set;


},{"./core":2,"./setting":14}],14:[function(require,module,exports){
var METHOD, setting;

METHOD = ['global', 'all', 'set', 'delete', 'find', 'first', 'last', 'min', 'max', 'like', 'limit'];

setting = function(obj, self) {
  var i, len, name;
  for (i = 0, len = METHOD.length; i < len; i++) {
    name = METHOD[i];
    obj[name]._before = self[name]._before;
    obj[name]._after = self[name]._after;
    obj[name].before = self[name].before;
    obj[name].after = self[name].after;
  }
  return obj;
};

module.exports = setting;


},{}]},{},[6])(6)
});