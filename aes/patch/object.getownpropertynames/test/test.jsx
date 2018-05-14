#include '../object.getownpropertynames.js'
#include '../../json/json.js'

const object1 = {
  a: 1,
  b: 2,
  c: 3
};

var actual = Object.getOwnPropertyNames(object1);
var expected = ["a", "b", "c"];

$.writeln( JSON.stringify(actual) === JSON.stringify(expected));
