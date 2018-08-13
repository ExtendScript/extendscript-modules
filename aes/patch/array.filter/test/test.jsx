#include './array.filter.js'
#include '././json/json.js'

function isBigEnough(value) {
  return value >= 10;
};

var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);

$.writeln( JSON.stringify(filtered) === JSON.stringify([12, 130, 44]) );
