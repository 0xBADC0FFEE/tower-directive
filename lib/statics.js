
/**
 * Instantiate a new `Directive`.
 */

exports.init = function(source, target){
  return new this(source, target);
}

/**
 * Setup function.
 */

exports.bind = function(fn){
  this.prototype._bind = fn;
  return this;
};

/**
 * Teardown function.
 */

exports.unbind = function(fn){
  this.prototype._unbind = fn;
  return this;
};

/**
 * Default subscription method (does nothing).
 *
 * Example:
 *
 *    directive('data-title').subscribe(function(ctx, fn){
 *      // if `ctx.source` is a `tower-model`,
 *      // and `ctx.target` is a DOM element
 *      ctx.source.on('change ' + ctx.sourcePath, fn);
 *    });
 *
 * @param {Function} fn A function `function(directive, handler)`.
 */

exports.subscribe = function(fn){
  this.prototype._subscribe = fn;
  return this;
};

/**
 * Default unsubscription method (does nothing).
 *
 * Example:
 *
 *    directive('data-title').unsubscribe(function(ctx, fn){
 *      // if `ctx.source` is a `tower-model`,
 *      // and `ctx.target` is a DOM element
 *      ctx.source.off('change ' + ctx.sourcePath, fn);
 *    });
 *
 * @param {Function} fn A function `function(directive, handler)`.
 */

exports.unsubscribe = function(directive, fn){
  this.prototype._unsubscribe = fn;
  return this;
};