
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , run = require('tower-run-loop');

/**
 * Expose `binding`.
 */

exports = module.exports = binding;

/**
 * Expose `collection`.
 */

exports.collection = [];

/**
 * Binding
 */

function binding() {
  return exports.define.apply(exports, arguments);
}

/**
 * Mixin an Emitter
 */

Emitter(binding);

/**
 * Define a new binding
 *
 * @param  {String}   name
 * @param  {Function} callback
 */

exports.define = function(name, callback) {
  exports.collection[name] = callback;
  binding.emit('define', name);
  // Make this method chain-able so that we can quickly define lots of bindings.
  return exports;
};