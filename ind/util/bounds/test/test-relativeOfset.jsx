#include "../node_modules/@extendscript/modules.init/init.js"
#include "../node_modules/@extendscript/aes.patch.json/json.js"

#include "../bounds.js"

var boundsUtil = Sky.getUtil("bounds");
var relativeOfset = boundsUtil.getRelativeOfset([10,10,20,20],[100,100,200,200]);

$.writeln( JSON.stringify(relativeOfset) === '{"bounds":[10,10,20,20],"height":10,"width":10,"topLeft":{"x":-90,"y":-90},"topCenter":{"x":-135,"y":-90},"topRight":{"x":-180,"y":-90},"midLeft":{"x":-90,"y":-135},"midCenter":{"x":-135,"y":-135},"midRight":{"x":-180,"y":-135},"botLeft":{"x":-90,"y":-180},"botCenter":{"x":-135,"y":-180},"botRight":{"x":-180,"y":-180}}' );
