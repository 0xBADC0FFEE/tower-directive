
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , Mixin = require('part-mixin')
  , run = require('tower-run-loop')
  , map = require('./lib/map');

/**
 * Expose `Binding`.
 *
 * @type {Binding}
 */

module.exports = Binding;

/**
 * Expose `map`.
 *
 * @type {Object}
 */

Binding.map = map;

/**
 * Binding Method (Mixin);
 *
 * @param {Object} obj
 */

function Binding(obj, html) {
  if (!obj) return false;

  if (html)
    Binding.prototype.__isDomElem = true;

  // Create a new mixin.
  return Mixin(obj, Binding.prototype);
}

/**
 * All the dirty keys within the object.
 *
 * @type {Array}
 */

Binding.prototype._dirty = [];

/**
 * All the generated IDs for each key.
 *
 * @type {Object}
 */

Binding.prototype._ids = {};

/**
 * Propagate changes to other bindings.
 * This method will do lookups on all the map instances
 * and update each binding.
 */

Binding.prototype.propagateBindings = function(){
  var bnd = map.find(this);
  console.log(bnd);
};

/**
 * Alert the system that a key has changed.
 *
 * @param  {String/Array} keys
 */

Binding.prototype.changed = function(keys){
  var type = typeof keys
    , self = this;

  if ('string' === type) {
    changed(keys);
  } else if ('object' === type && keys.length) {
    keys.forEach(function(key){
      changed(key);
    });
  }

  /**
   * Helper method to batch the binding update.
   *
   * @param  {String} key
   */

  function changed(key) {
    run.batch('sync', self, id(key), 'propagateBindings');
  }

  /**
   * Return an existing or generate a new ID based on
   * the given key.
   *
   * @param  {String} key
   * @return {Number}
   */

  function id(key) {
    var _id = self._ids[key];

    if (!_id) {
      var prev = self._ids[Object.keys(self._ids).length - 1];
      _id = self._ids[key] = prev && prev++ || 0;
    }

    return _id;
  }

  /**
   * Get the value of a given key. This method
   * will work with string-based namespaces `hello.one`
   *
   * @param  {String} key
   * @return {Any}
   */

  function get(key) {
    if (key.match(/\./g)) {
      var keys = key.split('.')
        , prev;

      prev = self[keys[0]];
      keys.splice(0, 1);

      for (var i = 0, n = keys.length; i < n; i++) {
        if (prev) {

          prev = prev[keys[i]];

          if ((n - 1) === i) {
            return prev;
          }

        } else {
          return new Error('Cannot find key: ' + key);
        }
      }
    }

    return self[key];
  }
};