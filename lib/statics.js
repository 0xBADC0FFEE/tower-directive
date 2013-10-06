
/**
 * Return optimized function for use in templates.
 *
 * @param {DOMNode} el el used for template.
 * @param {Function} nodeFn The template function used for transclusion.
 * @return {Object} A scope.
 * @api private
 */

exports.compile = function(el, nodeFn, attrs){
  var self = new this(el, nodeFn, attrs);

  // compile expression for directive name
  var exp = el.nodeType === 1
    ? el.getAttribute(this.id)
      ? this.compileExpression(el.getAttribute(this.id))
      : undefined
    : undefined; // text/comment nodes

  // get compiled function
  // XXX: put attrs here.
  var fn = this._exec || this._compile(el, exp, nodeFn);

  // executed every time template is rendered.
  return function exec(scope, el) {
    return fn.call(self, scope, el, exp, nodeFn, attrs) || scope;
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

exports.types = function(val){
  this.prototype._types = val;
  return this;
};

exports.compileExpressionForAttribute = function(name, val){
  // XXX: for now.
  return this.compileExpression(val);
};

exports.hasAttribute = function(name){
  return true;//!!(this._scope && this._scope.attrs[name]);
};

/**
 * Default expression.
 */

exports._expression = 'data-value';

/**
 * Custom expression name.
 */

exports.expression = function(name){
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

exports.priority = function(val){
  this.prototype.priority = val;
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

exports.terminal = function(val){
  this.prototype.terminal = false === val ? false : true;
  return this;
};