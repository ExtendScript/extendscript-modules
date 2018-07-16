#include '../object.getownpropertynames.js'
#include '../../json/json.js'

var myObj = { a: 1, b: 2, c: 3 };

var actual = Object.getOwnPropertyNames( myObj );
var expected = ["a", "b", "c"];

$.writeln( JSON.stringify(actual) === JSON.stringify(expected));
