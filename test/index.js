var binding = require('..');
var assert = require('assert');

describe('binding', function(){
  beforeEach(binding.clear);

  it('should define', function(done){
    binding.on('define', function(Binding){
      assert('property' === Binding.id);
      done();
    });

    binding('property');
  });

  it('should bind', function(done){
    var x = { title: 'foo' };
    var y = { title: 'bar' };

    binding('title', function(ctx, a, b){
      a.title = b.title;
      assert('bar' === a.title);
      done();
    });

    var b = binding('title').init(x, y);
    assert(x === b.source);
    assert(y === b.target);
    b.bind();
  });

  it('should allow setup/teardown', function(){
    var x = { title: 'foo' };
    var y = { title: 'bar' };
    var calls = [];

    binding('title')
      .bind(function(ctx, a, b){
        a.title = b.title;
        calls.push('bind');
      })
      .unbind(function(ctx, a, b){
        calls.push('unbind');
      });

    binding('title').init(x, y)
      .bind()
      .unbind();

    assert('bind,unbind' === calls.join(','));
  });
});