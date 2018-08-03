#include "../node_modules/@extendscript/modules.init/init.js"
#include "../rulers.js"

var Rulers = Sky.getUtil("rulers");

var confirmValues = [5,10,15,20,25,30];
var resultValues  = [];

resultValues.push( Rulers.numToGridStep(  3, 5 ) );
resultValues.push( Rulers.numToGridStep(  8, 5 ) );
resultValues.push( Rulers.numToGridStep( 14, 5 ) );
resultValues.push( Rulers.numToGridStep( 21, 5 ) );
resultValues.push( Rulers.numToGridStep( 25, 5 ) );
resultValues.push( Rulers.numToGridStep( 32, 5 ) );

var failed = [];

for (var i = 0; i < confirmValues.length; i++) { 
	if(confirmValues[i] !== resultValues[i]) {
		failed.push(i);
	}
};

$.writeln( failed.length === 0 );