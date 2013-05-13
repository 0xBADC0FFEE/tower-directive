
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter')
  , scopes = require('tower-scope')
  , directives = require('./lib/directives');

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
 * Check if directive is defined.
 *
 * XXX: defined vs. has vs. exists?
 */

exports.defined = function(name){
  return exports.collection.hasOwnProperty(name);
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
  // recursively emit `"remove"`.
  scopes.clear();
  exports.collection = [];
  directives(exports);
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
  this._priority = 0;
  if (fn) this._exec = fn;
}

/**
 * Apply the directive.
 *
 * @param {DOMNode} element
 * @param {Scope} scope
 */

Directive.prototype.exec = function(element, scope){
  // way to quickly access scope on element later.
  // XXX: pretty sure if the element gets removed,
  //      this won't create a memory leak.
  element.__scope__ = scope;

  // return a scope.
  return this._exec(scope, element, {
      name: this.name
    , value: element.getAttribute(this.name)
  }) || scope;
}

/**
 * XXX: The only types of elements this can be defined on.
 *
 * Comment/Script/Element/Text
 */

Directive.prototype.types = function(){
  return this;
}

/**
 * Sorting priority.
 *
 * Higher means it gets moved toward the front.
 *
 * @param {Integer} val Defaults to 0.
 * @return {Directive} self
 */

Directive.prototype.priority = function(val){
  this._priority = val;
  return this;
}

/**
 * toString.
 */

Directive.prototype.toString = function(){
  return 'directive("' + this.name + '")';
}

/**
 * Define base directives.
 */

directives(exports);