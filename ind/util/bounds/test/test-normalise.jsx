#include "../node_modules/@extendscript/modules.init/init.js"
#include "../node_modules/@extendscript/aes.patch.json/json.js"

#include "../bounds.js"

var boundsUtil = Sky.getUtil("bounds");

$.writeln( JSON.stringify( boundsUtil.normalise([10,10,20,20]) ) === '[0,0,10,10]' );
