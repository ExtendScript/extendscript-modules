#include '../foreach.js'
#include '../../json/json.js'

var items = ['item1', 'item2', 'item3'];
var myCopy = new Array();

items.forEach(function(item){
  myCopy.push(item)
});

$.writeln(JSON.stringify(items) === JSON.stringify(myCopy));
