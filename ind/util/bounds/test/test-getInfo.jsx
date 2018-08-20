#include "../node_modules/@extendscript/modules.init/init.js"
#include "../node_modules/@extendscript/aes.patch.json/json.js"

#include "../bounds.js"

var boundsUtil = Sky.getUtil("bounds");
var boundsInfo = boundsUtil.getInfo([10,10,20,20]);

$.writeln( JSON.stringify(boundsInfo) === '{"bounds":[10,10,20,20],"height":10,"width":10,"topLeft":{"x":10,"y":10},"topCenter":{"x":15,"y":10},"topRight":{"x":20,"y":10},"midLeft":{"x":10,"y":15},"midCenter":{"x":15,"y":15},"midRight":{"x":20,"y":15},"botLeft":{"x":10,"y":20},"botCenter":{"x":15,"y":20},"botRight":{"x":20,"y":20}}' );
