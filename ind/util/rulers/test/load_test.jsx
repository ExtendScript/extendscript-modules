#include "../node_modules/@extendscript/modules.init/modules.init.js"
#include "../rulers.js"

var loaded = (typeof Sky.getUtil("rulers").set === "function")

$.writeln( loaded === true );
