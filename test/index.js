var directive = require('tower-directive')
  , assert = require('timoxley-assert')
  , query = require('component-query');

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
});