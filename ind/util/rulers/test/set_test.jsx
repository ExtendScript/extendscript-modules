#include "../node_modules/@extendscript/modules.init/init.js"
#include "../rulers.js"

var Doc = app.documents.add();

var originalUnits = Sky.getUtil("rulers").set( Doc, {units: "ciceros"} );

var newUnits = Doc.viewPreferences.horizontalMeasurementUnits;

Doc.close(SaveOptions.NO);

$.writeln( String(newUnits) == "CICEROS" );
