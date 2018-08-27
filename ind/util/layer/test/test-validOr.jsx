#include "../node_modules/@extendscript/modules.init/init.js"
#include "../layer.js"

var LayerUtil = Sky.getUtil("layer");

var Doc = app.documents.add();

// This function touches most layer functions
var invalidLayer = LayerUtil.get( Doc, "test1", false );
var validLayer   = LayerUtil.get( Doc, "test2", true );
var myLayerName  = LayerUtil.validOr(invalidLayer, validLayer).name;

Doc.close(SaveOptions.NO);

$.writeln( myLayerName === "test2");
