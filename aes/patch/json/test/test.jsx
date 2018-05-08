#include '../json.js'

var jsonString = ('{"test":true}');

$.writeln( JSON.stringify(JSON.parse(jsonString)) === jsonString);
