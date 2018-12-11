#include '../node_modules/@extendscript/aes.patch.array.foreach/foreach.js'
#include '../node_modules/@extendscript/aes.patch.array.isarray/isarray.js'
#include '../node_modules/@extendscript/aes.patch.json/json.js'
#include '../instantiate.js'

var schema = {
    "title": "Test",
    "type" : "object",
    "properties": {
        "a"        : {"type": "string", "default": "hi"},
        "b"        : {"type": "object"}
    },
    "required" : ["a"]
};

var preset = JSON.instantiate( schema );

$.writeln( JSON.stringify(preset) === '{"a":"hi"}');
