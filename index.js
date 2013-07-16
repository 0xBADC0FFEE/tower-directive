
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter')
var content = require('tower-content')
var directives = require('./lib/directives')
var noop = function(){};

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

exports.defined = function(name){
  return exports.collection.hasOwnProperty(name);
};

exports.has = exports.defined;

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
  // recursively emit `"remove"`.
  content.clear();
  exports.collection = [];
  directives(exports);
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

function Directive(name, fn) {
  this.name = name;
  this._priority = 0;
  if (fn) this._exec = fn;
}

/**
 * Apply the directive.
 *
 * This one (compared to `compile`)
 * is useful for testing. It is slightly less optimized.
 *
 * @param {DOMNode} element The DOM element to apply the internal exec function to.
 * @param {Content} scope The content to apply the internal exec function to.
 * @return {Object} A scope.
 */

Directive.prototype.exec = function(element, scope){
  // way to quickly access scope on element later.
  // XXX: pretty sure if the element gets removed,
  //      this won't create a memory leak.
  element.__scope__ = scope;
  var attr = this._compileAttr(element);
  if (!content.is(scope)) scope = content('anonymous').init(scope);

  // return a scope.
  return this._exec(scope, element, attr) || scope;
};

/**
 * Return optimized function for use in templates.
 *
 * @param {DOMNode} element Element used for template.
 * @param {Function} nodeFn The template function used for transclusion.
 * @return {Object} A scope.
 * @api private
 */

Directive.prototype.compile = function(element, nodeFn){
  var self = this;
  // XXX: chance to hook in
  // exports.emit('precompile', element);
  var attr = this._compileAttr(element);
  var execFn = this._compiler
    ? this._compiler(element, attr, nodeFn)
    : this._exec;

  return function exec(element, scope) {
    element.__scope__ = scope;
    return execFn.call(self, scope, element, attr) || scope;
  }
};

/**
 * Define custom compiler function.
 *
 * @param {Function} fn Custom compiler function.
 * @return {Directive} this
 * @api private
 */

Directive.prototype.compiler = function(fn){
  this._compiler = fn;
  return this;
};

/**
 * XXX: The only types of elements this can be defined on.
 *
 * Comment/Script/Element/Text
 *
 * @chainable
 * @return {Function} exports The main `directive` function.
 */

Directive.prototype.types = function(){
  return this;
};

/**
 * Compile attribute from element.
 *
 * XXX: Maybe this becomes a separate module/object,
 *      or uses `tower-attr`.
 *
 * @param {Content} element The element to extract attributes from.
 * @return {Object} Extracted directive and element data.
 */

Directive.prototype._compileAttr = function(element){
  var val = element.getAttribute
    ? element.getAttribute(this.name)
    : undefined; // text/comment node

  return {
    name: this.name,
    value: val
  };
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

/**
 * Define base directives.
 */

directives(exports);