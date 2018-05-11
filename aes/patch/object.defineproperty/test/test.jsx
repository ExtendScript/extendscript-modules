#include '../object.defineproperty.js'

var object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

$.writeln( object1.property1 === 42);
