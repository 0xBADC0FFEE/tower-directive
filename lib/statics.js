
/**
 * XXX: The only types of els this can be defined on.
 *
 * Comment/Script/el/Text
 *
 * @chainable
 * @return {Function} exports The main `directive` function.
 */

exports.type = function(name){
  this.prototype[name] = true;
  return this;
};

/**
 * @chainable
 */

exports.meta = function(val){
  this.prototype.meta = null == val ? true : val;
  return this;
};

/**
 * Custom expression name.
 * @chainable
 */

exports.expression = function(name){
  this._expression = name;
  return this;
};

/**
 * Default expression.
 */

exports._expression = 'data-value';

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