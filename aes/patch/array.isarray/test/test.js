var test    = require('tape');
var estktap = require('estktap');
var path    = require('path');

test('extendscript array.isarray test',function(t){
  
  estktap('Indesign CC 2018 Array Test', path.join(__dirname, '/indcc2018.array-test.jsx'), true);
  
  t.end();

});
