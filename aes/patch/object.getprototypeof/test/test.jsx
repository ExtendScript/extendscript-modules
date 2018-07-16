#include '../object.getprototypeof.js'
#include '../../object.create/object.create.js'

var pType = {};
var obj1 = Object.create(pType);

$.writeln( Object.getPrototypeOf(obj1) === pType ); // expected: true
