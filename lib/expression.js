
/**
 * Expose `expression`.
 *
 * XXX: Maybe this becomes another module.
 */

module.exports = expression;

/**
 * Parse a directive expression.
 *
 * XXX: Maybe there are "named" expressions later.
 *
 * @param {String} val
 * @return {Function} fn Expression to evaluate
 *    against the current `scope`.
 */

function expression(val) {
  if (val.indexOf(':')) {
    return keyValueExpression(val);
  } else if (val.indexOf('(')) {
    return functionExpression(val);
  }

  return val;
}

// <input on-keypress="enter:createTodo">
// <input on-keypress="enter : createTodo">
function keyValueExpression(val) {
  val = val.split(/ +: +/);
  return { key: val[0], val: expression(val[0]) };
}

// <input on-keypress="enter:create(todo)">
function functionExpression(val) {
  
}

function argumentsExpression(val) {

}