exports.bind = function(){
  this._bind(this, this.source, this.target);
  return this;
};

// XXX: binding.on('change', fn);
exports.change = function(fn){
  exports.subscribe(this, this.source, this._change = fn);
  return this;
};

exports.unbind = function(){
  // exports.unsubscribe(this, this.source, this._change);
  this._unbind(this, this.source, this.target);
  return this;
};