
/**
 * Instantiate a new `Binding`.
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
 *    binding('data-title').subscribe(function(ctx, fn){
 *      // if `ctx.source` is a `tower-model`,
 *      // and `ctx.target` is a DOM element
 *      ctx.source.on('change ' + ctx.sourcePath, fn);
 *    });
 *
 * @param {Function} fn A function `function(binding, handler)`.
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
 *    binding('data-title').unsubscribe(function(ctx, fn){
 *      // if `ctx.source` is a `tower-model`,
 *      // and `ctx.target` is a DOM element
 *      ctx.source.off('change ' + ctx.sourcePath, fn);
 *    });
 *
 * @param {Function} fn A function `function(binding, handler)`.
 */

exports.unsubscribe = function(binding, fn){
  this.prototype._unsubscribe = fn;
  return this;
};