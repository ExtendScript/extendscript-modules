#include '../map.js'
#include '../../json/json.js'

var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});

$.writeln( JSON.stringify(doubles) === '[2,8,18]' );
