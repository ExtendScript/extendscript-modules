#include "test-header.js"

// Does this work properly when item is on paste-board?
// Add test to proof

var Doc = app.documents.add();
with( Doc.documentPreferences ){
    pageHeight = "100mm";
    pageWidth  = "100mm";
    documentBleedUniformSize = true;
    documentSlugUniformSize = true;
    documentBleedTopOffset = "10mm";
    documentSlugTopOffset = "10mm";
};

var rect = Pageitems.addRect( Doc.pages[0] ); 
rect.move([-100,-100]); // Move rectangle off the page

var parentPage = Pageitems.getParentPage( rect ).name;

Doc.close(SaveOptions.NO);

$.writeln( parentPage === "1");
