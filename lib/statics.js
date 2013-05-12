
/**
 * Instantiate a new `Directive`.
   *
   * @param {Scope} scope
   * @param {DOMElement} element
   * @api public
 */

exports.init = function(scope, element){
  return new this(scope, element);
}

/**
 * Setup function.
 */

exports.exec = function(fn){
  this.prototype.exec = fn;
  return this;
};

/**
 * XXX: The only types of elements this can be defined on.
 *
 * Comment/Script/Element/Text
 */

exports.only = function(){
  return this;
}