#include "../modules.init.js"

var loaded = false;
var unloaded = false;

if (typeof Sky.unload === "function") { 
    loaded = true;
    Sky.unload();
};

if( typeof Sky === null ) {
    unloaded = true;
};

// Sky should be loaded and unloaded
$.writeln( typeof loaded === typeof unloaded === true);
