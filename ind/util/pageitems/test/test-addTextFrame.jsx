#include "test-header.js"

var Doc = app.documents.add();
with( Doc.documentPreferences ){
    pageHeight = "100mm";
    pageWidth  = "100mm";
    documentBleedUniformSize = true;
    documentSlugUniformSize = true;
    documentBleedTopOffset = "10mm";
    documentSlugTopOffset = "10mm";
};

var tf = Pageitems.addTextFrame( Doc.pages[0], {contents: "OK", autoSize: "HEIGHT_AND_WIDTH"} );
var contents = tf.contents;

Doc.close(SaveOptions.NO);

$.writeln( contents === "OK" );
