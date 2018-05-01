#include "../array.reduceright.js"

var sum = [0, 1, 2, 3].reduceRight(function(a, b) {
  return a + b;
});

$.writeln( sum === 6);
