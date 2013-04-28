/**
 * Module Dependencies
 */

var Emitter = require('emitter')
  , run     = require('tower-run-loop');



/**
 * Export
 */

var exports = module.exports = binding;



/**
 * Binding
 */

function binding() {

}

/**
 * Mixin an Emitter
 */

Emitter(binding);

/**
 * Object that holds all the bindings.
 *
 * @type {Object}
 */

exports.bindings = {};

/**
 * Define a new binding
 *
 * @param  {String}   name
 * @param  {Function} callback
 */

exports.define = function(name, callback) {
  binding.emit('defined', name);
  exports.bindings[name] = callback;
  // Make this method chain-able so that we can quickly define lots of bindings.
  return exports;
};