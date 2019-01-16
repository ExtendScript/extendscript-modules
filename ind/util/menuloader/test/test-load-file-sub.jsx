#include "../node_modules/@extendscript/modules.init/init.js"
#include "../menuloader.js"

var MenuLoader = Sky.getUtil("menuloader");

var Options = {
    path: "File",
    sub: [
            { caption: "Above the Line...", fun: function(){ alert("Above the Line...") },  subName: "" },
            { separator: true, subName: "" },
            { caption: "... the Line...", fun: function(){ alert("Below the Line...") },  subName: "Below ..." }
    ]
};

var testMenu = new MenuLoader.menuTemplate("MenuLoader File Sub Test", Options);

MenuLoader.load(testMenu, true);

var menu = MenuLoader.getMenu( testMenu );

var loaded = menu.isValid;

MenuLoader.unload(testMenu, true);

var unloaded = !menu.isValid;

$.writeln( loaded === true && unloaded === true);
