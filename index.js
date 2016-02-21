(function() {
  var Block;

  Block = function(obj) {
    if (obj == null) {
      obj = {};
    }
    this.objects = obj.json ? Object.freeze(obj.json()) : Object.freeze(obj);
    this._init();
    return this;
  };

  Block.prototype = {
    _init: function() {
      var self;
      self = this;
      this.all = function() {
        var _obj;
        _obj = new Block(this.all.init(this.json()) || this);
        _obj = new Block(this.all.finish(_obj.json()) || this);
        _obj.all.init = this.all.init;
        _obj.all.finish = this.all.finish;
        return _obj;
      };
      this.all.init = function(event) {
        var _obj;
        _obj = new Block(typeof event === "object" ? event : self);
        if (typeof event === 'function') {
          _obj.all.init = event;
        }
        return _obj;
      };
      this.all.finish = function(event) {
        var _obj;
        _obj = new Block(typeof event === "object" ? event : self);
        if (typeof event === 'function') {
          _obj.all.finish = event;
        }
        return _obj;
      };
      this.set = function(callback) {
        var _obj;
        _obj = new Block(this.set.init(this.json()) || this);
        _obj = new Block(callback(_obj.json()) || this);
        _obj = new Block(this.set.finish(_obj.json()) || this);
        _obj.set.init = this.set.init;
        _obj.set.finish = this.set.finish;
        return _obj;
      };
      this.set.init = function(event) {
        var _obj;
        _obj = new Block(typeof event === "object" ? event : self);
        if (typeof event === 'function') {
          _obj.set.init = event;
        }
        return _obj;
      };
      this.set.finish = function(event) {
        var _obj;
        _obj = new Block(typeof event === "object" ? event : self);
        if (typeof event === 'function') {
          _obj.set.finish = event;
        }
        return _obj;
      };
      this["delete"] = function(obj) {
        var _obj;
        if (obj == null) {
          obj = {};
        }
        _obj = new Block(this["delete"].init(this.json()) || this);
        _obj = _obj.json().filter(function(item) {
          var i, key, len, ref, valid;
          valid = true;
          ref = Object.keys(obj);
          for (i = 0, len = ref.length; i < len; i++) {
            key = ref[i];
            valid = item[key] !== obj[key];
            if (!valid) {
              break;
            }
          }
          if (valid) {
            return item;
          }
        });
        _obj = new Block(_obj);
        _obj = new Block(this["delete"].finish(_obj.json()) || this);
        _obj["delete"].init = this["delete"].init;
        _obj["delete"].finish = this["delete"].finish;
        return _obj;
      };
      this["delete"].init = function(event) {
        var _obj;
        _obj = new Block(typeof event === "object" ? event : self);
        if (typeof event === 'function') {
          _obj["delete"].init = event;
        }
        return _obj;
      };
      this["delete"].finish = function(event) {
        var _obj;
        _obj = new Block(typeof event === "object" ? event : self);
        if (typeof event === 'function') {
          _obj["delete"].finish = event;
        }
        return _obj;
      };
      this.find = function(obj) {
        var _obj;
        if (obj == null) {
          obj = {};
        }
        _obj = new Block(this.find.init(this.json()) || this);
        _obj = _obj.json().filter(function(item) {
          var i, key, len, ref, valid;
          valid = true;
          ref = Object.keys(obj);
          for (i = 0, len = ref.length; i < len; i++) {
            key = ref[i];
            valid = item[key] === obj[key];
            if (!valid) {
              break;
            }
          }
          if (valid) {
            return item;
          }
        });
        _obj = new Block(_obj);
        _obj = new Block(this.find.finish(_obj.json()) || this);
        _obj.find.init = this.find.init;
        _obj.find.finish = this.find.finish;
        return _obj;
      };
      this.find.init = function(event) {
        var _obj;
        _obj = new Block(typeof event === "object" ? event : self);
        if (typeof event === 'function') {
          _obj.find.init = event;
        }
        return _obj;
      };
      return this.find.finish = function(event) {
        var _obj;
        _obj = new Block(typeof event === "object" ? event : self);
        if (typeof event === 'function') {
          _obj.find.finish = event;
        }
        return _obj;
      };
    },
    json: function() {
      return JSON.parse(JSON.stringify(this.objects));
    },
    equals: function(obj) {
      var i, len, prop, self, type, x;
      if (obj == null) {
        obj = {};
      }
      self = this.json();
      x = obj.json ? obj.json() : obj;
      if (x === null || x === void 0) {
        return false;
      }
      if (Object.keys(self).length !== Object.keys(x).length) {
        return false;
      }
      for (i = 0, len = self.length; i < len; i++) {
        prop = self[i];
        if (self.hasOwnProperty(prop)) {
          if (!x.hasOwnProperty(prop)) {
            return false;
          }
          type = typeof self[prop];
          if (type === 'function') {
            return false;
          } else if (type === 'object') {
            if (!self[prop].equals(x[prop])) {
              return false;
            }
          } else {
            if (self[prop] !== x[prop]) {
              return false;
            }
          }
        }
      }
      return true;
    }
  };

  module.exports = Block;

}).call(this);
