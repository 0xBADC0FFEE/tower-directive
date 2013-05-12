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
    directive('data-title', function(ctx, element){
      assert(scope.root() === ctx);
      assert(query('#mocha') === element);
      done();
    }).exec(scope.root(), query('#mocha'));
  });
});