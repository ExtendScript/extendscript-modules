#include '../indexof.js'

var testData = ['This','is','a','test','a'];

$.writeln( testData.indexOf('a') === 2 && testData.indexOf('a', 3) === 4 );
