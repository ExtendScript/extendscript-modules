#include "../node_modules/@extendscript/modules.init/init.js"
#include "../menuloader.js"

var MenuLoader = Sky.getUtil("menuloader");

var sayHello = function() {
    alert( "Hello!" );
};

var testMenu = {
    locationPath: ["File"],
    beforeAfter:  undefined,
    reference: undefined,
    menuName: "MenuLoader Test",
    invokeFunction: sayHello
};

MenuLoader.loadSetup(testMenu);

var menu = MenuLoader.getMenuItem( testMenu.menuName );

var loaded = menu.isValid;

MenuLoader.unloadSetup(testMenu);

var unloaded = !menu.isValid;

$.writeln( loaded === true && unloaded === true);
