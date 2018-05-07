#include "../json.js"

var json = '{"hundred":100}';
var obj = JSON.parse(json);

$.writeln( obj.hundred === 100);
