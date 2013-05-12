var directive = require('tower-directive')
  , scope = require('tower-scope')
  , query = require('component-query')
  , assert = require('timoxley-assert')
  , collection = directive.collection;

describe('directive', function(){
  beforeEach(directive.clear);

  it('should define', function(done){
    directive.on('define', function(instance){
      assert('property' === instance.name);
      done();
    });

    directive('property');
  });

  it('should execute', function(done){
    directive('data-title', function(scope, element){
      done();
    }).exec();
  });

  it('should execute all', function(){
    directive('data-text', function(scope, element, attr){
      element.textContent = scope[attr.value];
    });

    directive('data-title', function(scope, element, attr){
      element.setAttribute('title', scope[attr.value]);
    });

    directive.exec({ foo: 'Foo', bar: 'Bar' });

    assert('Foo' === query('#should-execute-all').title);
    assert('Bar' === query('#should-execute-all span').textContent);
  });

  it('should use `scope("root")` if none is passed in', function(){
    directive('data-html', function(scope, element, attr){
      element.innerHTML = scope[attr.value];
    });

    scope.root().set('foo', 'Hello World');

    directive.exec();

    assert('Hello World' === query('#should-use-root-scope').innerHTML);
  });

  it('should print "directive(name)" on instance.toString()', function(){
    assert('directive("data-text")' === directive('data-text').toString());
  });

  it('should print "directive" on exports.toString()', function(){
    assert('directive' === directive.toString());
  });

  it('should return `true` if `defined`', function(){
    assert(false === directive.defined('data-random'));
    directive('data-random', function(){});
    assert(true === directive.defined('data-random'));
  });

  describe('directives', function(){
    beforeEach(function(){
      directive.collection = collection;
    });

    it('should have `data-text`', function(){
      assert(true === directive.defined('data-text'));
      var root = scope.root();
      root.set('textDirective', 'Text Directive');
      directive.exec(root, query('#directives'));
      assert('Text Directive' === query('#data-text-directive span').textContent);
    });

    // XXX: should iterate through all to test them all.
    it('should have `data-[attr]`', function(){
      assert(true === directive.defined('data-title'));
      var root = scope.root();
      root.set('attrDirective', 'Attribute Directive');
      directive.exec(root, query('#directives'));
      assert('Attribute Directive' === query('#data-attr-directive a').title);
    });

    it('should have event directives `on-[event]`', function(done){
      assert(true === directive.defined('on-click'));
      var root = scope.root();
      root.set('eventDirective', function(){
        // XXX: works, but need to tear down previous ones.
        console.log('exec!', arguments);
        done();
      });
      directive.exec(root, query('#directives'));

      var event = document.createEvent('UIEvent');
      event.initUIEvent('click', true, true);
      event.clientX = 5;
      event.clientY = 10;
      event.passThrough = 'foo';
      query('#data-event-directive a').dispatchEvent(event);
    });
  });

  after(function(){
    document.body.removeChild(query('#tests'));
  });
});