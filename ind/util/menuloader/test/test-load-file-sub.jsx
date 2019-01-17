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

var testMenu = new MenuLoader.template("MenuLoader File Sub Test", Options);

testMenu.load(true);
var loaded = testMenu.isLoaded();

testMenu.unload(true);
var unloaded = !testMenu.isLoaded();

$.writeln( loaded === true && unloaded === true);
