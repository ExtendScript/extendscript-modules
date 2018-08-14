#include '../getprototypeof.js'
#include '../../object.create/create.js'

var pType = {};
var obj1 = Object.create(pType);

$.writeln( Object.getPrototypeOf(obj1) === pType ); // expected: true
