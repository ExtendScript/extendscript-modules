#include '../object.getownpropertydescriptor.js'

var obj = {
  prop1: 42
}

var descr = Object.getOwnPropertyDescriptor(obj, 'prop1');

$.writeln( descr.value === 42);
