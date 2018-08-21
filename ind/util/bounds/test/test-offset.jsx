#include "../node_modules/@extendscript/modules.init/init.js"
#include "../node_modules/@extendscript/aes.patch.json/json.js"

#include "../bounds.js"

var boundsUtil = Sky.getUtil("bounds");

$.writeln( JSON.stringify( boundsUtil.offset([10,10,20,20], [5,10]) ) === '[20,15,30,25]' );
