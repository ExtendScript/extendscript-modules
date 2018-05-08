#include '../array.some.js'

var array = [1, 2, 3, 4, 5];

var even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

$.writeln( array.some(even) === true);
