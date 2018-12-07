#include '../../json/json.js'
#include '../clone.js'

var test_Obj = {name:"test",num:0}
var clone = JSON.clone( test_Obj );

$.writeln( (JSON.stringify(test_Obj) === JSON.stringify(clone)) && (test_Obj != clone) );
