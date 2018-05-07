#include "../json.js"

var obj = {"hundred":100};
var json = JSON.stringify(obj);

$.writeln( json === '{"hundred":100}');
