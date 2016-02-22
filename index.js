(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Block = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Method, setting;

setting = require('./setting');

Method = function(exec, name, self) {
  this._exec = exec;
  this._name = name;
  this._self = self;
  this._init = false;
  this._finish = false;
  this.init = function(event) {
    var _obj;
    _obj = new Block(typeof event === 'object' ? event : this._self);
    if (typeof event === 'function') {
      _obj = setting(_obj, this._self);
      _obj[this._name]._init = true;
      _obj[this._name]._finish = this._self[this._name]._finish;
      _obj[this._name].init = event;
      _obj[this._name].finish = this._self[this._name].finish;
    }
    return _obj;
  };
  this.finish = function(event) {
    var _obj;
    _obj = new Block(typeof event === 'object' ? event : this._self);
    if (typeof event === 'function') {
      _obj = setting(_obj, this._self);
      _obj[this._name]._init = this._self[this._name]._init;
      _obj[this._name]._finish = true;
      _obj[this._name].init = this._self[this._name].init;
      _obj[this._name].finish = event;
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


},{"./setting":7}],2:[function(require,module,exports){
var all, setting;

setting = require('./setting');

all = function() {
  var _obj;
  _obj = new Block(this._self.global.init(this._self.json()) || this._self);
  _obj = new Block(this.init(_obj.json()) || _obj);
  _obj = new Block(this._self.global.finish(_obj.json()) || _obj);
  _obj = new Block(this.finish(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = all;


},{"./setting":7}],3:[function(require,module,exports){
var del, setting;

setting = require('./setting');

del = function(obj) {
  var _obj, i, item, j, key, len, len1, out, ref, ref1, valid;
  if (obj == null) {
    obj = false;
  }
  _obj = new Block(this._self.global.init(this._self.json()) || this._self);
  _obj = new Block(this.init(_obj.json()) || _obj);
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
  _obj = new Block(this._self.global.finish(_obj.json()) || _obj);
  _obj = new Block(this.finish(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = del;


},{"./setting":7}],4:[function(require,module,exports){
var find, setting;

setting = require('./setting');

find = function(obj) {
  var _obj, i, item, j, key, len, len1, out, ref, ref1, valid;
  if (obj == null) {
    obj = false;
  }
  _obj = new Block(this._self.global.init(this._self.json()) || this._self);
  _obj = new Block(this.init(_obj.json()) || _obj);
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
  _obj = new Block(this._self.global.finish(_obj.json()) || _obj);
  _obj = new Block(this.finish(_obj.json()) || _obj);
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = find;


},{"./setting":7}],5:[function(require,module,exports){
var Block, Method, all, del, find, set;

Method = require('./Method');

all = require('./all');

set = require('./set');

del = require('./delete');

find = require('./find');

Block = function(obj) {
  if (obj == null) {
    obj = [];
  }
  this._objects = obj.json ? Object.freeze(obj.json()) : Object.freeze(obj);
  this.global = new Method(new Function(), 'global', this);
  this.count = 1;
  this._init();
  return this;
};

Block.prototype = {
  _init: function() {
    this.all = new Method(all, 'all', this);
    this.set = new Method(set, 'set', this);
    this["delete"] = new Method(del, 'delete', this);
    return this.find = new Method(find, 'find', this);
  },
  map: function(callback) {
    var _obj, _out, i, key, len, ref;
    _obj = this.json();
    _out = [];
    ref = Object.keys(_obj);
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      _out.push(callback(_obj[key]));
    }
    return new Block(_out);
  },
  push: function(item) {
    var _obj;
    _obj = this.json();
    _obj.push(item);
    return new Block(_obj);
  },
  pop: function() {
    var _obj;
    _obj = this.json();
    if (Object.keys(_obj).length > 1) {
      _obj.pop();
    } else {
      _obj = [];
    }
    return new Block(_obj);
  },
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

module.exports = Block;


},{"./Method":1,"./all":2,"./delete":3,"./find":4,"./set":6}],6:[function(require,module,exports){
var set, setting;

setting = require('./setting');

set = function(callback) {
  var _obj;
  if (callback == null) {
    callback = new Function();
  }
  _obj = new Block(this._self.global.init(this._self.json()) || this._self);
  _obj = new Block(this.init(_obj.json()) || _obj);
  _obj = new Block(callback(_obj.json()) || _obj);
  _obj = new Block(this._self.global.finish(_obj.json()) || _obj);
  _obj = new Block(this.finish(_obj.json()) || _obj);
  _obj.count += this._self.count;
  _obj = setting(_obj, this._self);
  return _obj;
};

module.exports = set;


},{"./setting":7}],7:[function(require,module,exports){
var METHOD, setting;

METHOD = ['global', 'all', 'set', 'delete', 'find'];

setting = function(obj, self) {
  var i, len, name;
  for (i = 0, len = METHOD.length; i < len; i++) {
    name = METHOD[i];
    obj[name]._init = self[name]._init;
    obj[name]._finish = self[name]._finish;
    obj[name].init = self[name].init;
    obj[name].finish = self[name].finish;
  }
  return obj;
};

module.exports = setting;


},{}]},{},[5])(5)
});