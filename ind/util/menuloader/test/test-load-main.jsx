#include "../node_modules/@extendscript/modules.init/init.js"
#include "../menuloader.js"

var MenuLoader = Sky.getUtil("menuloader");

var sayHello = function() {
    alert( "Hello!" );
};

var testMenu = new MenuLoader.template("MenuLoader Main Test", {fun: sayHello});

var loaded = testMenu.load().isLoaded();
var unloaded = !testMenu.unload().isLoaded();

$.writeln( loaded === true && unloaded === true);
