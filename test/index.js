var binding = 'undefined' == typeof window ? require('..') : require('tower-data-binding')
  , assert = require('assert');

describe("data-binding", function(){
  var bindObj = {};

  beforeEach(function() {
    binding(bindObj);
  });

  describe("changed", function() {
    it('should emit `changed` event', function(done) {
      bindObj.on('changed', function(key) {
        assert('name' === key);
        done();
      });

      bindObj.changed(['name']);
    });

    it('should emit `(key) changed` event', function(done) {
      bindObj.on('name changed', function(key) {
        done();
      });

      bindObj.changed(['name']);
    });
  });

  describe('propagateBindings', function() {
    it('should emit `propagating bindings` event', function(done) {
      bindObj.on('propagating bindings', function() {
        done();
      });

      bindObj.propagateBindings();
    });
  });
});