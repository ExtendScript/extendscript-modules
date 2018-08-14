#include '../defineproperties.js'

var object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true
  },
  property2: {}
});

$.writeln( object1.property1 === 42);
