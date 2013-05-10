
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter')
  , proto = require('./lib/proto')
  , statics = require('./lib/statics');

/**
 * Expose `bind`.
 */

exports = module.exports = binding;

/**
 * Expose `collection`.
 */

exports.collection = [];

/**
 * Get/set binding function.
 *
 * 
 * 
 * @param {String} name
 * @param {Function} fn
 */

function binding(name, fn) {
  if (undefined === fn && exports.collection[name])
    return exports.collection[name];

  /**
   * Instantiate a new `Binding`.
   */

  function Binding(source, target) {
    this.name = name;
    this.source = source;
    this.target = target;
  }

  Binding.prototype = {};
  Binding.id = name;

  // statics
  for (var key in statics) Binding[key] = statics[key];

  // proto
  for (var key in proto) Binding.prototype[key] = proto[key];

  if (fn) Binding.prototype._bind = fn;

  exports.collection[name] = Binding;
  exports.collection.push(Binding);
  exports.emit('define', Binding);
  return Binding;
}

/**
 * Mixin `Emitter`.
 */

Emitter(exports);

/**
 * Clear all bindings.
 */

exports.clear = function(){
  exports.off('define');
  exports.collection = [];
  return exports;
}