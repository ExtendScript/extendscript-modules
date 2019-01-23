#include "../node_modules/@extendscript/modules.init/init.js"
#include "../menuloader.js"

var MenuLoader = Sky.getUtil("menuloader");

var sayHello = function() {
    alert( "Hello!" );
};

var Options = {
    path: [app.translateKeyString('$ID/TouchMenuFile'), app.translateKeyString("$ID/New")],
    loc: LocationOptions.AFTER,
    ref: app.translateKeyString("$ID/Document") + "...",
    fun: sayHello
};

var testMenu = new MenuLoader.template("MenuLoader File Sub Test After New Document...", Options);

testMenu.load(true);
var loaded = testMenu.isLoaded();

testMenu.unload(true);
var unloaded = !testMenu.isLoaded();

$.writeln( loaded === true && unloaded === true);
