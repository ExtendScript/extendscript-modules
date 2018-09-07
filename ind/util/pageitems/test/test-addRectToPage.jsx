#include "test-header.js"

var Bounds = Sky.getUtil("bounds");

var Doc = app.documents.add();
with( Doc.documentPreferences ){
    pageHeight = "100mm";
    pageWidth  = "100mm";
    documentBleedUniformSize = true;
    documentSlugUniformSize = true;
    documentBleedTopOffset = "10mm";
    documentSlugTopOffset = "10mm";
};

// Set rulers to mm to test our rectangle size
Rulers.set( app.activeDocument, "MM");

var rect = Pageitems.addRectToPage( Doc.pages[0] ); 
var rectWidth = Bounds.getInfo(rect.geometricBounds).width;

Doc.close(SaveOptions.NO);

$.writeln( Number(rectWidth) === 100 );
