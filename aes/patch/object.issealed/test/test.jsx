#include '../object.issealed.js'

const object1 = {
  property1: 42
};

$.writeln( Object.isSealed(object1) === false);
