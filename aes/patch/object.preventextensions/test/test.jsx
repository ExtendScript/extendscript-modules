#include '../preventextensions.js'

var obj = {};
var obj2 = Object.preventExtensions(obj);

$.writeln( obj === obj2 );
