#include '../object.keys.js'
#include '../../json/json.js'

var enumArr = Object.keys({0:"a",1:"b",2:"c"})

$.writeln( JSON.stringify(enumArr) === '["0","1","2"]' );
