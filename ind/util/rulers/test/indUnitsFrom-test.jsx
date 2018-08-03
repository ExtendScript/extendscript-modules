#include "../node_modules/@extendscript/modules.init/init.js"
#include "../rulers.js"
#include "./ruler-data.js"

var Rulers = Sky.getUtil("rulers");

var failed = [];

for (var u = 0; u < rulerUnits.length; u++) { 
    var rulerUnit = rulerUnits[u];
    for (var v = 0; v < rulerUnit.strVals.length; v++) { 
        var strVal = rulerUnit.strVals[v];
        var result = Rulers.indUnitsFrom(strVal);
        if( result !== rulerUnit.indUnits ) {
            failed.push(strVal);
        };
    };
};

$.writeln( failed.length === 0 );