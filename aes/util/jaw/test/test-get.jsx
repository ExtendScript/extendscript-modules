#include "../node_modules/@extendscript/modules.init/init.js"
#include '../node_modules/@extendscript/aes.patch.array.foreach/foreach.js'
#include '../node_modules/@extendscript/aes.patch.array.isarray/isarray.js'
#include '../node_modules/@extendscript/aes.patch.array.indexof/indexof.js'
#include '../node_modules/@extendscript/aes.patch.object.keys/keys.js'
#include '../node_modules/@extendscript/aes.patch.json/json.js'
#include '../node_modules/@extendscript/aes.patch.json.clone/clone.js'
#include '../node_modules/@extendscript/aes.patch.json.instantiate/instantiate.js'
#include '../node_modules/@extendscript/aes.patch.json.validate/validate.js'
#include "../jaw.js"

var obj = { x : 0 }

var schema = {
    "title": "Test",
    "type" : "object",
    "properties": {
        "a"        : {"type": "string", "default": "hi"},
        "b"        : {"type": "object"}
    },
    "required" : ["a"]
};

var obj_manager = Sky.getUtil("jaw").init( schema, obj );

$.writeln( JSON.stringify(obj_manager.get()) === '{"x":0,"a":"hi"}' );
