
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter');

/**
 * Expose `directive`.
 */

exports = module.exports = directive;

/**
 * Expose `collection`.
 */

exports.collection = [];

/**
 * Expose `Directive`.
 */

exports.Directive = Directive;

/**
 * Get/set directive function.
 * 
 * @param {String} name
 * @param {Function} fn
 */

function directive(name, fn) {
  if (undefined === fn && exports.collection[name])
    return exports.collection[name];

  var instance = new Directive(name, fn);
  exports.collection[name] = instance;
  exports.collection.push(instance);
  exports.emit('define', instance);
  return instance;
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
  exports.off();
  exports.collection = [];
  return exports;
}

/**
 * Instantiate a new `Directive`.
 *
 * @param {String} name
 * @param {Function} [fn]
 * @api private
 */

function Directive(name, fn) {
  this.name = name;
  if (fn) this.setup(fn);
}

Directive.prototype.setup = function(fn){
  this.exec = fn;
  return this;
}

/**
 * XXX: The only types of elements this can be defined on.
 *
 * Comment/Script/Element/Text
 */

Directive.prototype.only = function(){
  return this;
}

/**
 * toString.
 */

Directive.prototype.toString = function(){
  return 'directive("' + name + '")';
}
