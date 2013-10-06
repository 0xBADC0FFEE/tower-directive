
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

  // meta node (such as `data-each` or `data-if`)
  if (this.meta) {
    // you have to replace nodes, not remove them, to keep order.
    var comment = exports.document.createComment(' ' + this.name + ':' + val + ' ');
    el.parentNode.replaceChild(comment, el);
    //nodeFn = template(templateEl);
  }

  if (this.template) {
    el.parentNode.replaceChild(x, el);
  }

  var fn = this.constructor._exec
    || this.constructor._compile(el, exp, nodeFn, attrs);

  // executed every time template is rendered.
  obj.exec = function(scope, el){
    return fn.call(obj, scope, el, exp, nodeFn, attrs) || scope;
  }

  return obj.exec;
};