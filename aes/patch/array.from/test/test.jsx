#include '../../json/json.js'
#include '../array.from.js'

var x = Array.from('foo');
var expected = ['f','o','o'];

$.writeln( JSON.stringify(x) === JSON.stringify(expected) );
