#include "../node_modules/@extendscript/modules.init/init.js"
#include "../node_modules/@extendscript/ind.util.layer/layer.js"
#include "../node_modules/@extendscript/aes.patch.bundle.array/array.js"

#include "../pageitems.js"

var PageItems = Sky.getUtil("pageitems");

var Doc = app.documents.add();
with( Doc.documentPreferences ){
    pageHeight = "100mm";
    pageWidth  = "100mm";
    documentBleedUniformSize = true;
    documentSlugUniformSize = true;
    documentBleedTopOffset = "10mm";
    documentSlugTopOffset = "10mm";
};

var rect = PageItems.addRect( Doc.pages[0], {strokeWeight: "0.25mm"} ); 

Doc.close(SaveOptions.NO);

$.writeln( Math.round(rect.strokeWeight) === 1 );
