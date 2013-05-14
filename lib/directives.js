
/**
 * Module dependencies.
 */

var scopes = require('tower-scope')
  , event = require('event'); // XXX: this file should be moved to separate module.

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
  
  // creates a new scope

  directive('data-scope', function(scope, element, attr){
    return scopes(attr.value).init({ parent: scope });
  });

  directive('data-text', function(scope, element, attr){
    element.textContent = scope.get(attr.value);
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
      element.setAttribute(name, scope.get(attr.value));
    });
  }

  function eventDirective(name) {
    directive('on-' + name, function(scope, element, attr){
      function handle(evt) {
        evt.preventDefault();
        // XXX: some way of passing parameters (shouldn't pass `evt`).
        scope.apply(attr.value, [evt]);
      }

      event.bind(element, name, handle);

      scope.on('remove', function(){
        event.unbind(element, name, handle);
      });
    });
  }
}