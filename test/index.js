var directive = 'undefined' === typeof window
  ? require('..')
  : require('tower-directive');

var assert = 'undefined' === typeof window
  ? require('assert')
  : require('timoxley-assert');

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
});