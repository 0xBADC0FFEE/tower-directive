
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter');
var compile = require('tower-directive-expression');

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
 * @param {String} name The directive's name.
 * @param {Function} fn Function called on directive definition.
 * @return {Directive} A `Directive` object.
 * @api public
 */

function directive(name, fn, manualCompile) {
  if (undefined === fn && exports.collection[name])
    return exports.collection[name];

  var instance = new Directive(name, fn, manualCompile);
  exports.collection[name] = instance;
  exports.collection.push(instance);
  exports.emit('define', instance);
  return instance;
}

/**
 * Mixin `Emitter`.
 */

Emitter(exports);

/**
 * Check if a directive is defined.
 *
 * @param {String} name A directive name.
 * @return {Boolean} true if the `Directive` has been defined, but false otherwise
 * @api public
 */

exports.has = function(name){
  return exports.collection.hasOwnProperty(name);
};

/**
 * Standard `toString`.
 *
 * @return {String} A specifically formatted String.
 * @api public
 */

exports.toString = function(){
  return 'directive';
};

/**
 * Clear all directives.
 *
 * @chainable
 * @return {Function} exports The main `directive` function.
 * @api public
 */

exports.clear = function(){
  exports.off();
  exports.collection = [];
  return exports;
};

/**
 * Class representing the extensions to HTML.
 *
 * @class
 *
 * @param {String} name The directive's name.
 * @param {Function} The directive function to be executed.
 * @api private
 */

function Directive(name, fn, manualCompile) {
  this.name = name;
  this._priority = 0;

  if (fn) {
    if (manualCompile || 1 === fn.length) {
      this._compile = fn;
    } else {
      this._exec = fn;
    }
  }
}

/**
 * Return optimized function for use in templates.
 *
 * @param {DOMNode} el el used for template.
 * @param {Function} nodeFn The template function used for transclusion.
 * @return {Object} A scope.
 * @api private
 */

Directive.prototype.compile = function(el, nodeFn){
  var self = this;

  // compile expression for directive name
  var exp = el.nodeType === 1
    ? compile(this._expression, el.getAttribute(this.name))
    : undefined; // text/comment nodes

  // get compiled function
  var fn = this._exec || this._compile(el, exp, nodeFn);

  // executed every time template is rendered.
  return function exec(scope, el) {
    return fn.call(self, scope, el, exp, nodeFn) || scope;
  }
};

/**
 * XXX: The only types of els this can be defined on.
 *
 * Comment/Script/el/Text
 *
 * @chainable
 * @return {Function} exports The main `directive` function.
 */

Directive.prototype.types = function(){
  return this;
};

/**
 * Default expression.
 */

Directive.prototype._expression = 'data-value';

/**
 * Custom expression name.
 */

Directive.prototype.expression = function(name){
  this._expression = name;
  return this;
};

/**
 * Sorting priority.
 *
 * Higher means it gets moved toward the front.
 *
 * @chainable
 * @param {Integer} val Defaults to 0.
 * @return {Function} exports The main `directive` function.
 */

Directive.prototype.priority = function(val){
  this._priority = val;
  return this;
};

/**
 * Terminal.
 *
 * If set to true, it will stop processing the template right there.
 * Then it is up to the directive itself to handling creating sub-templates.
 * This is used mainly for creating iterators.
 *
 * @chainable
 * @param {Boolean} [val]
 * @return {Directive} this
 */

Directive.prototype.terminal = function(val){
  this._terminal = false === val ? false : true;
  return this;
};

/**
 * Standard `toString`.
 *
 * @return {String} A specifically formatted String.
 */

Directive.prototype.toString = function(){
  return 'directive("' + this.name + '")';
};