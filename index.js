
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter')
  , scopes = require('tower-scope')
  , query = require('query')
  , directives = require('./lib/directives')
  , compile = require('./lib/compile');

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
 * Expose `compile`.
 */

exports.compile = compile;
compile.directive = exports; // XXX: tmp circular

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
 * Execute all directives.
 */

exports.exec = function(scope, element){
  if (0 === arguments.length) {
    scope = scopes.root();
    element = query('body');
  } else if (!element) {
    element = query('body');
  }

  if (!scope) scope = scopes.root();

  exports.compile(element, scope);

  return exports;
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
  if (fn) this.setup(fn);
}

Directive.prototype.setup = function(fn){
  this._exec = fn;
  return this;
}

/**
 * Apply the directive.
 *
 * @param {Scope} scope
 * @param {DOMNode} element
 */

Directive.prototype.exec = function(scope, element){
  // XXX: not sure if this should pass each individually or just a block
  //      (like jQuery object).

  this._exec(scope, element, {
      name: this.name
    , value: element.getAttribute(this.name)
  });

  return this;
}

/**
 * A custom scope to add to elements with this directive.
 *
 * @param {String} name
 * @return {Directive} self
 * @api public
 */

Directive.prototype.scope = function(name){
  this._scope = name;
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