#include '../array.from.js'
#include '../../json/json.js'

var x = Array.from('foo');
var expected = ['f','o','o'];

$.writeln( JSON.stringify(x) === JSON.stringify(expected) );
