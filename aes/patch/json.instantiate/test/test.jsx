#include '../node_modules/@extendscript/aes.patch.array.foreach/foreach.js'
#include '../node_modules/@extendscript/aes.patch.array.isarray/isarray.js'
#include '../node_modules/@extendscript/aes.patch.json/json.js'
#include '../instantiate.js'

var schema = {
    "type": "object",
    "properties": {
        "name": { "type": "string", "default": "New Preset" },
        "bool": { "type": ["null", "boolean"] },
        "obj":  { "type": "object",
            "properties": {
                "x": { "type": "number", "default": 0 },
                "y": { "type": "number", "default": 0 }
            }
        }
    }
};

var preset = JSON.instantiate( schema, {requiredPropertiesOnly: false} );

$.writeln( JSON.stringify(preset) === '{"name":"New Preset","bool":null,"obj":{"x":0,"y":0}}');
