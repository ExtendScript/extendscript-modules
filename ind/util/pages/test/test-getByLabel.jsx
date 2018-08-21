#include "../node_modules/@extendscript/modules.init/init.js"
#include '../node_modules/@extendscript/aes.patch.json/json.js'
#include "../node_modules/@extendscript/ind.util.bounds/bounds.js"
#include "../node_modules/@extendscript/ind.util.rulers/rulers.js"

#include "../pages.js"

var PagesUtil = Sky.getUtil("pages");

var doc = app.documents.add();
with( doc.documentPreferences ){
    pagesPerDocument = 2;
};

var labelStr = "world";
var labelKey = "hello";

doc.pages[0].label = labelStr;
doc.pages[1].insertLabel(labelKey,labelStr);

var found = [];
var allFound = true;

found = PagesUtil.getByLabel( doc.pages, labelStr );
if (found.length !== 1) allFound = false;
found = PagesUtil.getByLabel( doc.pages, "labelStr" );
if (found.length !== 0) allFound = false;
found = PagesUtil.getByLabel( doc.pages, labelStr, labelKey );
if (found.length !== 1) allFound = false;
found = PagesUtil.getByLabel( doc.pages, labelStr, {key:labelKey,any:true} );
if (found.length !== 2) allFound = false;

doc.close(SaveOptions.NO);

$.writeln( allFound === true );
