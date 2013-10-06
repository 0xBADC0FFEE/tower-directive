
/**
 * Module dependencies.
 */

var Emitter = require('tower-emitter');
var compile = require('tower-directive-expression');
var content = require('tower-content');
var statics = require('./lib/statics');

/**
 * Expose `directive`.
 */

exports = module.exports = directive;

/**
 * Expose `collection`.
 */

exports.collection = [];

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

  /**
   * Class representing the extensions to HTML.
   *
   * @class
   *
   * @param {String} name The directive's name.
   * @param {Function} The directive function to be executed.
   * @api private
   */

  function Directive(el, attrs, nodeFn) {
    this.name = name;
    // attribute, text, element, comment
  }

  Directive.id = name;
  Directive.expressions = {};
  Directive.prototype._types = { attribute: true };

  if (fn) {
    if (manualCompile || 1 === fn.length) {
      Directive._compile = fn;
    } else {
      Directive._exec = fn;
    }
  }

  Directive.compileExpression = function(val){
    return exports.expression(this._expression, val);
  };

  for (var key in statics) Directive[key] = statics[key];

  exports.collection[name] = Directive;
  exports.collection.push(Directive);
  exports.emit('define', Directive);
  return Directive;
}

/**
 * Mixin `Emitter`.
 */

Emitter(exports);

/**
 * Get/compile directive expression.
 */

exports.expression = function(name, val, opts, fn){
  var Directive = exports(name);
  return Directive.expressions[val]
    = Directive.expressions[val]
    || compile.apply(null, arguments);
};

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