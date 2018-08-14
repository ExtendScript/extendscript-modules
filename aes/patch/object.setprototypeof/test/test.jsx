#include '../setprototypeof.js'

var proto = { y: 2 };  

var obj = { x: 10 };  
Object.setPrototypeOf(obj, proto);   

$.writeln( obj.y === 2 );
