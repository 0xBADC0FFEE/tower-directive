
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter')
  , scopes = require('tower-scope')
  , query = require('query');

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
 * Execute all directives.
 */

exports.exec = function(scope, element){
  if (0 === arguments.length) {
    scope = scopes('root');
    element = query('body');
  } else if (!element) {
    element = query('body');
  }

  for (var i = 0, n = exports.collection.length; i < n; i++) {
    exports.collection[i].exec(scope, element);
  }

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
  var elements = query.all('[' + this.name + ']', element);
  // XXX: not sure if this should pass each individually or just a block
  //      (like jQuery object).
  for (var i = 0, n = elements.length; i < n; i++) {
    this._exec(scope, elements[i], {
      name: this.name
      , value: elements[i].getAttribute(this.name)
    });
  }

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
