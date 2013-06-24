
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
 *
 * @param {Function} The directive module.
 */

function directives(directive) {

  // simple helpers for defining extra directives.

  directive.event = eventDirective;
  directive.attr = attrDirective;
  
  // creates a new scope

  directive('data-scope', function(scope, el, attr){
    return content(attr.value).init({ parent: scope });
  });

  directive('data-text', function(scope, el, attr){
    var val = scope.get(attr.value);
    if (undefined !== val)
      el.textContent = val;
  });

  // attr directives

  for (var i = 0, n = attrs.length; i < n; i++) {
    attrDirective(attrs[i]);
  }

  // event directives

  if ('undefined' !== typeof window) {
    // only on client, note server. tmp solution

    for (var i = 0, n = events.length; i < n; i++) {
      eventDirective(events[i]);
    }
  }

  function attrDirective(name) {
    directive('data-' + name, function(scope, el, attr){
      var exp = attr.expression;
      var prop = exp.deps[0];
      var val = scope.get(prop);

      if (undefined !== val)
        el.setAttribute(name, val);

      if (!event) return;

      if (exp.bindTo) {
        function handle(evt) {
          scope.attrs.event = evt;
          // XXX: `exp.broadcast` option.
          scope.set(prop, el.value);
          delete scope.attrs.event;
        }

        event.bind(el, 'change', handle);

        scope.on('remove', function(){
          event.unbind(el, 'change', handle);
        });
      }

      if (exp.bindFrom) {
        scope.on('change ' + prop, function(curr, prev){
          el.setAttribute(curr, val);
        });
      }
    });
  }

  function eventDirective(name) {
    // XXX: refactor to optimize for specific cases.
    directive('on-' + name, function(scope, el, attr){
      function handle(evt) {
        // so it can be used by expression
        scope.attrs.event = evt;
        if ('change' === name) evt.value = value(el);
        // scope.apply(attr.value, [evt]);
        attr.expression(scope);
        delete scope.attrs.event;
      }

      event.bind(el, name, handle);

      scope.on('remove', function(){
        event.unbind(el, name, handle);
      });
    });
  }
}