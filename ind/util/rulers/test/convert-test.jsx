#include "../node_modules/@extendscript/modules.init/init.js"
#include "../rulers.js"

var Rulers = Sky.getUtil("rulers");

var failed = [];

/*

for (var t = 0; t < testMeasures.length; t++) { 
    var testValue = testValues[t].value;
    var fromUnit  = testValues[t].unit;
    var expected  = testValue.expected;
    // Check the testvalues
    for (var c = 0; c < expected.length; c++) { 
        var expectedValue = expected[c].value;
        var toUnit  = expected[c].unit;

        var value = Rulers.convert(testValue, fromUnit, toUnit);
        
        if( value !== expectedValue) {
            failed.push( String(testValue) + String(fromUnit) + " should be " + String(expectedValue) + String(toUnit) + " but is " + String(value) );
        };
    };
    alert(failed);
};
*/

$.writeln( failed.length === 0 );
