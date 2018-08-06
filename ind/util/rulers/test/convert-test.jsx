#include "../node_modules/@extendscript/modules.init/init.js"
#include "../rulers.js"

#include "./measure-data.js"

var Rulers = Sky.getUtil("rulers");

var failed = [];

for (var t = 0; t < testMeasures.length; t++) { 
    var testValue = testMeasures[t].value;
    var fromUnit  = testMeasures[t].unit;
    var expected  = testMeasures[t].convertedValues;
    var roundDec  = testMeasures[t].roundDec;

    // Check the test values
    for (var c = 0; c < expected.length; c++) { 
        
        var expectedValue = expected[c].value;
        var toUnit  = expected[c].unit;

        var value = Rulers.convert( testValue, fromUnit, toUnit, roundDec);
        
        if( value !== expectedValue) {
            failed.push( String(testValue) + " " + String(fromUnit) + " should be " + String(expectedValue) + " " + String(toUnit) + " but is " + String(value) );
        };
    };
};

$.writeln( failed.length === 0 );
