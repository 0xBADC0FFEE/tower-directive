
/**
 * Bind.
 */

exports.bind = function(){
  this._bind(this, this.source, this.target);
  return this;
};

// XXX: binding.on('change', fn);
exports.subscribe = function(fn){
  this._subscribe(this, this._onchange = fn);
  return this;
};

exports.unsubscribe = function(){
  this._unsubscribe(this, this._onchange);
  return this;
};

exports.unbind = function(){
  // exports.unsubscribe(this, this.source, this._change);
  this._unbind(this, this.source, this.target);
  return this;
};

exports.value = function(name){
  return this.data
    ? this.data[name]
    : undefined;
};