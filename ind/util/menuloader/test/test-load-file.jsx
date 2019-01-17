#include "../node_modules/@extendscript/modules.init/init.js"
#include "../menuloader.js"

var MenuLoader = Sky.getUtil("menuloader");

var sayHello = function() {
    alert( "Hello!" );
};

var testMenu = new MenuLoader.template("MenuLoader Test", {path: "File", fun: sayHello});

MenuLoader.load(testMenu, true);

var menu = MenuLoader.getMenu( testMenu );

var loaded = menu.isValid;

MenuLoader.unload(testMenu, true);
var unloaded = !menu.isValid;

$.writeln( loaded === true && unloaded === true);
