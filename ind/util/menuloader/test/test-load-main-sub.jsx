#include "../node_modules/@extendscript/modules.init/init.js"
#include "../menuloader.js"

var MenuLoader = Sky.getUtil("menuloader");

var Options = {
    sub: [
            { caption: "Above the Line...", fun: function(){ alert("Above the Line...") },  subName: "" },
            { separator: true, subName: "" },
            { caption: "... the Line...", fun: function(){ alert("Below the Line...") },  subName: "Below ..." }
    ]
};

var testMenu = new MenuLoader.template("MenuLoader Sub Test", Options);

testMenu.load();

var menu = MenuLoader.getMenu( testMenu );

var loaded = menu.isValid;
var unloaded = !testMenu.unload().isLoaded();

$.writeln( loaded === true && unloaded === true);
