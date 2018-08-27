#include "../node_modules/@extendscript/modules.init/init.js"
#include "../layer.js"

var LayerUtil = Sky.getUtil("layer");

var Doc = app.documents.add();

// This function touches most layer functions
var myLayerName = LayerUtil.moveAndSelect( Doc, "test", -1, true ).name;

Doc.close(SaveOptions.NO);

$.writeln( myLayerName === "test");
