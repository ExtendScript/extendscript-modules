#include '../find.js'

var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function(element) {
  return element > 10;
});

$.writeln( found === 12 );
