
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
  this._bind = fn;
  return this;
};

/**
 * Teardown function.
 */

exports.unbind = function(fn){
  this._unbind = fn;
  return this;
};

/**
 * Default subscription method.
 */

exports.subscribe = function(obj, prop, fn){
  if (!obj.on) return;
  obj.on('change ' + prop, fn);
};

/**
 * Default unsubscription method.
 */

exports.unsubscribe = function(obj, prop, fn){
  if (!obj.off) return;
  obj.off('change ' + prop, fn);
};