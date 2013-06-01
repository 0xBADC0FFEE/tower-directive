
var directive = require('tower-directive');
var scope = require('tower-scope');
var query = require('component-query');
var assert = require('timoxley-assert');

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
    }).exec(query('#mocha'), scope.root());
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
    }).exec(query('#mocha'), scope.root());

    assert(custom === result);
  });

  describe('expressions', function(){
    it('should handle operator expressions', function(){
      var element = query('#operator-expression');
      directive('data-operator-expression', function(ctx, element, attr){
        if (attr.expression(ctx)) {
          element.textContent = 'Count is greater than 10';
        } else {
          element.textContent = 'Count is not greater than 10';
        }
      });

      directive('data-operator-expression').exec(element, { count: 20 });
      assert('Count is greater than 10' === element.textContent);
      directive('data-operator-expression').exec(element, { count: 5 });
      assert('Count is not greater than 10' === element.textContent);
    });

    it('should handle function(arg) expressions', function(done){
      var element = query('#fn-arg-expression');
      directive('data-fn-arg-expression', function(ctx, element, attr){
        attr.expression(ctx);
      });

      scope('todos')
        .attr('todo', 'object')
        .action('create', function(todo){
          assert('A todo!' === todo.title);
          done();
        });

      var ctx = scope('todos').init({ todo: { title: 'A todo!' } });
      directive('data-fn-arg-expression').exec(element, ctx);
    });
  });
});