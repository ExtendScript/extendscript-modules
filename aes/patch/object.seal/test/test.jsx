#include '../object.seal.js'

var object1 = {
  property1: 42,
  property2: 84
};

Object.seal(object1); // This does not fail nor seal
delete object1.property1; // Still works

$.writeln( object1.property1 === undefined);
