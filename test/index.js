var directive = require('tower-directive')
  , scope = require('tower-scope')
  , query = require('component-query')
  , assert = require('timoxley-assert');

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

  after(function(){
    document.body.removeChild(query('#tests'));
  });
});