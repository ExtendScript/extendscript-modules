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
    pagesPerDocument = 3;
    facingPages = true;
};

var rect = Pageitems.addRect( Doc.pages[2] ); 
rect.move(undefined, [0,-30]); // Move rectangle off the page

var parentPage = Pageitems.getParentPage( rect ).name;

Doc.close(SaveOptions.NO);

$.writeln( parentPage === "3");
