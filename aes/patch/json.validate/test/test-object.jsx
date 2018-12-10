#include '../node_modules/@extendscript/aes.patch.array.foreach/foreach.js'
#include '../node_modules/@extendscript/aes.patch.array.isarray/isarray.js'
#include '../node_modules/@extendscript/aes.patch.array.indexof/indexof.js'
#include '../node_modules/@extendscript/aes.patch.object.keys/keys.js'
#include '../node_modules/@extendscript/aes.patch.json/json.js'
#include '../validate.js'

var schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string", "default": "New Preset" },
        "bool": { "type": ["null", "boolean"] },
        "arr": { "type": "array", "items": { "type": "string" } },
        "obj":  { "type": "object",
            "properties": {
                "x": { "type": "number", "default": 0 },
                "y": { "type": "number", "default": 0 }
            }
        }
    }
};

var errors = JSON.validate( {name:"New Preset",bool:null, arr: ["o","k"], obj:{x:0,y:0}} , schema );

$.writeln( errors.length === 0);
