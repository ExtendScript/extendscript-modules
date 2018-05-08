#include '../array.foreach.js'
#include '../../json/json.js'

var items = ['item1', 'item2', 'item3'];
var copy = [];

items.forEach(function(item){
  copy.push(item)
});

$.writeln(JSON.stringify(items) === JSON.stringify(copy));
