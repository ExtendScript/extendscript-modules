#include '../array.every.js'

function isBigEnough(element, index, array) {
  return element >= 10;
};

$.writeln( [12, 54, 18, 130, 44].every(isBigEnough) === true );
