
/**
 * Module dependencies.
 */

var scope = require('tower-scope')
  , isArray = require('part-is-array');

/**
 * Expose `compile`.
 *
 * XXX: maybe this becomes a `tower-template` module.
 */

exports = module.exports = compile;

/**
 * Traverse `element` and children recursively,
 * and collect and execute directives.
 */

function compile(element) {
  return isArray(element)
    ? compileEach(element)
    : compileEach([element]);
}

function compileEach(children) {
  var node, directives;
  for (var i = 0, n = children.length; i < n; i++) {
    node = children[i];
    directives = compileNode(node);
    exec(node, directives);
    // recursive
    if (node.childNodes) compileEach(node.childNodes);
  }
}

function compileNode(node) {
  var directives = [];

  switch (node.nodeType) {
    case 1: // element node
      // first, add directive named after node, if it exists.
      add(node.nodeName.toLowerCase(), directives);
      compileAttributes(node, directives);
      break;
    case 3: // text node
      // node.nodeValue
      add('interpolate', directives);
      break;
    case 8: // comment node
      //
      break;
  }

  return directives; 
}

function compileAttributes(node, directives) {
  var attr;
  for (var i = 0, n = node.attributes.length; i < n; i++) {
    attr = node.attributes[i];
    // The specified property returns true if the 
    // attribute value is set in the document, 
    // and false if it's a default value in a DTD/Schema.
    // http://www.w3schools.com/dom/prop_attr_specified.asp
    // XXX: don't know what this does.
    if (!attr.specified) continue;
    add(attr.name, directives);
  }
}

/**
 * Add directive.
 */

function add(name, directives) {
  if (exports.directive.defined(name)) {
    directives.push(exports.directive(name));
  }
}

/**
 * Execute all directives.
 */

function exec(node, directives, ctx) {
  var n = directives.length;
  ctx || (ctx = scope.root());

  if (n) {
    for (var i = 0; i < n; i++) {
      directives[i].exec(ctx, node);
    }
  }
}