
/**
 * Module dependencies.
 */

var content = require('tower-content')
if ('undefined' !== typeof window) {
  var event = require('event') // XXX: this file should be moved to separate module.
  var value = require('value'); 
}

/**
 * Expose `directives`.
 */

module.exports = directives;

/**
 * Attributes supported.
 */

var attrs = [
  'id',
  'src',
  'rel',
  'cols',
  'rows',
  'name',
  'href',
  'title',
  'style',
  'width',
  'value',
  'height',
  'tabindex',
  'placeholder'
];

/**
 * Events supported.
 */

var events = [
  'change',
  'click',
  'mousedown',
  'mouseup',
  'blur',
  'focus',
  'input',
  'keydown',
  'keypress',
  'keyup'
];

/**
 * Define base directives.
 */

function directives(directive) {

  // simple helpers for defining extra directives.

  directive.event = eventDirective;
  directive.attr = attrDirective;
  
  // creates a new scope

  directive('data-scope', function(scope, element, attr){
    return content(attr.value).init({ parent: scope });
  });

  directive('data-text', function(scope, element, attr){
    var val = scope.get(attr.value);
    if (undefined !== val)
      element.textContent = val;
  });

  // attr directives

  for (var i = 0, n = attrs.length; i < n; i++) {
    attrDirective(attrs[i]);
  }

  // event directives

  for (var i = 0, n = events.length; i < n; i++) {
    eventDirective(events[i]);
  }

  function attrDirective(name) {
    directive('data-' + name, function(scope, element, attr){
      var val = scope.get(attr.value);
      if (undefined !== val)
        element.setAttribute(name, val);
    });
  }

  function eventDirective(name) {
    // XXX: refactor to optimize for specific cases.
    directive('on-' + name, function(scope, element, attr){
      function handle(evt) {
        // so it can be used by expression
        scope.attrs.event = evt;
        if ('change' === name) evt.value = value(element);
        // scope.apply(attr.value, [evt]);
        attr.expression(scope);
        delete scope.attrs.event;
      }

      event.bind(element, name, handle);

      scope.on('remove', function(){
        event.unbind(element, name, handle);
      });
    });
  }
}