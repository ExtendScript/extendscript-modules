#include '../function.bind.js'

var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;

var boundGetX = unboundGetX.bind(module);

$.writeln( boundGetX() === 42);
