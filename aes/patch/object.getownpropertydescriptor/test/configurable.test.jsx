#include '../object.getownpropertydescriptor.js'

var obj = {
  prop: 42
}

var descr = Object.getOwnPropertyDescriptor(obj, 'prop');

$.writeln( descr.configurable === true);
