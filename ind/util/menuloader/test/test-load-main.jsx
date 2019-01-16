#include "../node_modules/@extendscript/modules.init/init.js"
#include "../menuloader.js"

var MenuLoader = Sky.getUtil("menuloader");

var sayHello = function() {
    alert( "Hello!" );
};

var testMenu = new MenuLoader.menuTemplate("MenuLoader Main Test", {fun: sayHello});

MenuLoader.load(testMenu, false);

var menu = MenuLoader.getMenu( testMenu );

var loaded = menu.isValid;

MenuLoader.unload(testMenu, false);

var unloaded = !menu.isValid;

$.writeln( loaded === true && unloaded === true);
