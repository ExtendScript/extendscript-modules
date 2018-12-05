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
    pagesPerDocument = 3;
    documentBleedBottomOffset = "5mm";
    documentBleedInsideOrLeftOffset = "5mm";
    documentBleedOutsideOrRightOffset = "5mm";	
    documentBleedTopOffset = "5mm";
    slugBottomOffset = "10mm";
    slugInsideOrLeftOffset = "10mm";
    slugRightOrOutsideOffset = "10mm";
    slugTopOffset = "10mm";
};

var pageInfo = PagesUtil.getInfo( doc.spreads[1], "mm" );

doc.close(SaveOptions.NO);

$.writeln( JSON.stringify(pageInfo) === '{"units":"mm","kind":"Spread","bounds":[0,0,100,200],"width":200,"height":100,"bleedBounds":[-5,-5,105,205],"slugsBounds":[-15,-15,115,215]}');