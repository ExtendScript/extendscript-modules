#include "../node_modules/@extendscript/modules.init/init.js"
#include '../node_modules/@extendscript/aes.patch.json/json.js'
#include "../node_modules/@extendscript/ind.util.bounds/bounds.js"
#include "../node_modules/@extendscript/ind.util.rulers/rulers.js"

#include "../pages.js"

var PagesUtil = Sky.getUtil("pages");

var doc = app.documents.add();
with( doc.documentPreferences ){
    pageHeight = "100mm";
    pageWidth  = "100mm";
    pagesPerDocument = 1;
    documentBleedBottomOffset = "5mm";
    documentBleedInsideOrLeftOffset = "5mm";
    documentBleedOutsideOrRightOffset = "5mm";	
    documentBleedTopOffset = "5mm";
    slugBottomOffset = "10mm";
    slugInsideOrLeftOffset = "10mm";
    slugRightOrOutsideOffset = "10mm";
    slugTopOffset = "10mm";
};

var pageInfo = PagesUtil.getInfo( doc.pages[0], "mm" );

doc.close(SaveOptions.NO);

$.writeln( JSON.stringify(pageInfo) === '{"units":"mm","kind":"Page","bounds":[0,0,100,100],"width":100,"height":100,"bleedBounds":[-5,-5,105,105],"slugsBounds":[-15,-15,115,115]}');
