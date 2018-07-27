#include "../node_modules/@extendscript/modules.init/modules.init.js"
#include "../ruler.js"

var Doc = app.documents.add();

var originalUnits = Sky.getUtil("ruler").set( Doc, {units: "ciceros"} );

var newUnits = Doc.viewPreferences.horizontalMeasurementUnits

Doc.close(SaveOptions.NO);

$.writeln( String(newUnits) == "CICEROS" );
