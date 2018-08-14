#include '../assign.js'

var object1 = {
  a: 1,
  b: 2,
  c: 3
};

var object2 = Object.assign({c: 4, d: 5}, object1);

$.writeln( object2.c === 3 && object2.d === 5 );
