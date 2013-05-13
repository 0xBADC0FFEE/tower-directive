
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

  it('should execute (and return a scope)', function(done){
    var result = directive('data-title', function(ctx, element){
      assert(scope.root() === ctx);
      assert(query('#mocha') === element);
      done();
    }).exec(scope.root(), query('#mocha'));

    assert(scope.root() === result);
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

  it('should return a custom scope', function(){
    var custom = scope('custom').init();

    var result = directive('data-title', function(ctx, element){
      return custom;
    }).exec(scope.root(), query('#mocha'));

    assert(custom === result);
  });
});