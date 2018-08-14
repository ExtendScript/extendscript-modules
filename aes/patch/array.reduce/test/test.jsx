#include '../reduce.js'

var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

$.writeln( sum === 6);
