/**
 * Module Exports
 */

var exports = module.exports = map;


function map(from, to, direction) {
  return exports.maps.push(new Map(from, to, direction));
}

exports.Map = Map;

function Map(from, to, direction) {
  this.from = from;
  this.to   = to;
  this.direction = direction || 'fwd';
}

/**
 * List of Map instances.
 *
 * @type {Array}
 */

exports.maps = [];


exports.find = function(binding) {
  var exp = [];

  for (var i = 0, n = exports.maps.length; i < n; i++) {
    var map = exports.maps[i];

    if (map.from === binding) exp.push(map);
    if (map.to   === binding) exp.push(map);

  }

  if (exp) return exp;

  return false;
};