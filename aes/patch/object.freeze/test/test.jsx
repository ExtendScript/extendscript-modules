#include '../object.freeze.js'

const object1 = {
  property1: 42
};

const object2 = Object.freeze(object1);

object2.property1 = 33;
// Throws an error in strict mode

$.writeln( object2.property1 === 33); // 33!!
