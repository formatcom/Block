(function() {
  var Block;

  Block = function(obj) {
    if (obj == null) {
      obj = {};
    }
    this._data = JSON.stringify(obj);
    return this;
  };

  Block.prototype = {
    get: function() {
      return new Block(this.json());
    },
    set: function(callback) {
      return new Block(callback(this.json()));
    },
    json: function() {
      return JSON.parse(this._data);
    },
    equals: function(obj) {
      var i, len, prop, self, type, x;
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
