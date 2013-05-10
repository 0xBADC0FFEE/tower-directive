var directive = 'undefined' === typeof window
  ? require('..')
  : require('tower-directive');

var assert = 'undefined' === typeof window
  ? require('assert')
  : require('timoxley-assert');

describe('directive', function(){
  beforeEach(directive.clear);

  it('should define', function(done){
    directive.on('define', function(Directive){
      assert('property' === Directive.id);
      done();
    });

    directive('property');
  });

  it('should bind', function(done){
    var x = { title: 'foo' };
    var y = { title: 'bar' };

    directive('title', function(ctx, a, b){
      a.title = b.title;
      assert('bar' === a.title);
      done();
    });

    var b = directive('title').init(x, y);
    assert(x === b.source);
    assert(y === b.target);
    b.bind();
  });

  it('should allow setup/teardown', function(){
    var x = { title: 'foo' };
    var y = { title: 'bar' };
    var calls = [];

    directive('title')
      .bind(function(ctx, a, b){
        a.title = b.title;
        calls.push('bind');
      })
      .unbind(function(ctx, a, b){
        calls.push('unbind');
      });

    directive('title').init(x, y)
      .bind()
      .unbind();

    assert('bind,unbind' === calls.join(','));
  });
});