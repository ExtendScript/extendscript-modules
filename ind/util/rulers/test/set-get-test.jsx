#include "../node_modules/@extendscript/modules.init/init.js"
#include "../rulers.js"

var Rulers = Sky.getUtil("rulers");

var Doc = app.documents.add();

var originalUnits = Rulers.set( Doc, {units: "ciceros"} );
var newUnits = Doc.viewPreferences.horizontalMeasurementUnits;
var getUnits = Rulers.get( Doc ).xruler;

Doc.close(SaveOptions.NO);

$.writeln( "ciceros" === String(getUnits).toLowerCase() &&  "ciceros" === String(newUnits).toLowerCase()  );
