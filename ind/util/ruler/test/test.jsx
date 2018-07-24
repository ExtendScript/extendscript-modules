#include "../node_modules/@extendscript/modules.init/modules.init.js"
#include "../ruler.js"

var loaded = (typeof Sky.getUtil("ruler").set === "function")

$.writeln( loaded === true );
