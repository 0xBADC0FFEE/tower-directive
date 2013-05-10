
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter')
  , proto = require('./lib/proto')
  , statics = require('./lib/statics');

/**
 * Expose `bind`.
 */

exports = module.exports = directive;

/**
 * Expose `collection`.
 */

exports.collection = [];

/**
 * Get/set directive function.
 *
 * 
 * 
 * @param {String} name
 * @param {Function} fn
 */

function directive(name, fn) {
  if (undefined === fn && exports.collection[name])
    return exports.collection[name];

  /**
   * Instantiate a new `Directive`.
   */

  function Directive(source, target) {
    this.name = name;
    this.source = source;
    this.target = target;
  }

  Directive.prototype = {};
  Directive.id = name;

  // statics
  for (var key in statics) Directive[key] = statics[key];

  // proto
  for (var key in proto) Directive.prototype[key] = proto[key];

  if (fn) Directive.prototype._bind = fn;

  exports.collection[name] = Directive;
  exports.collection.push(Directive);
  exports.emit('define', Directive);
  return Directive;
}

/**
 * toString.
 */

exports.toString = function(){
  return 'directive';
}

/**
 * Mixin `Emitter`.
 */

Emitter(exports);

/**
 * Clear all directives.
 */

exports.clear = function(){
  exports.off('define');
  exports.collection = [];
  return exports;
}

exports.subscribe = function(fn){
  exports._subscribe = fn;
  return exports;
}

exports.unsubscribe = function(fn){
  exports._unsubscribe = fn;
  return exports;
}