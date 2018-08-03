#include "../node_modules/@extendscript/modules.init/init.js"
#include "../rulers.js"
#include "./ruler-data.js"

var Rulers = Sky.getUtil("rulers");

var failed = [];

for (var u = 0; u < rulerUnits.length; u++) { 
    var rulerUnit = rulerUnits[u];
    var longName  = Rulers.niceNameFor(rulerUnit.indUnits);
    var shortName = Rulers.niceNameFor(rulerUnit.indUnits, true);

    if( longName !== rulerUnit.names[0] || shortName  !== rulerUnit.names[1] ) {
        failed.push(rulerUnits.names[0]);
    };
};

$.writeln( failed.length === 0 );