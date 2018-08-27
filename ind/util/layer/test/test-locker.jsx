#include "../node_modules/@extendscript/modules.init/init.js"
#include "../layer.js"

var LayerUtil = Sky.getUtil("layer");

var Doc = app.documents.add();

var validLayer = LayerUtil.get( Doc, "unlocked", true );

var originalLock = validLayer.locked;
var previousLock = LayerUtil.locker( validLayer, true ); // false

var result = validLayer.locked === !(originalLock);

Doc.close(SaveOptions.NO);

$.writeln( (originalLock === previousLock) === result === true );
