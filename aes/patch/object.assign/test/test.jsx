#include '../object.assign.js'
#include '../../json/json.js'

const object1 = {
  a: 1,
  b: 2,
  c: 3
};

const object2 = Object.assign({c: 4, d: 5}, object1);

$.writeln( JSON.stringify(object2) === '{"a":1,"b":2,"c":3,"d":5}');
