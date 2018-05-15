#include '../object.getprototypeof.js'
#include '../../object.create/object.create.js'

var prototype1 = {};
var object1 = Object.create(prototype1);

$.writeln( Object.getPrototypeOf(object1) === prototype1 ); // expected: true
