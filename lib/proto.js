
/**
 * Return optimized function for use in templates.
 *
 * @param {DOMNode} el el used for template.
 * @param {Function} nodeFn The template function used for transclusion.
 * @return {Object} A scope.
 * @api private
 */

exports.compile = function(el, nodeFn){
  var obj = this;
  var attrs = this.attrs;
  var exp = attrs[this.name];

  var fn = this.constructor._exec
    || this.constructor._compile.call(this, el, exp, nodeFn, attrs);

  // executed every time template is rendered.
  obj.exec = function(scope, el){
    return fn.call(obj, scope, el, exp, nodeFn, attrs) || scope;
  }

  return obj.exec;
};