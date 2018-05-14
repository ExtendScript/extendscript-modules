#include '../object.getownpropertydescriptor.js'

var object1 = {
  property1: 42
}

var descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

$.writeln( descriptor1.value === 42);
