#include "../node_modules/@extendscript/modules.init/init.js"
#include '../node_modules/@extendscript/aes.patch.array.foreach/foreach.js'
#include '../node_modules/@extendscript/aes.patch.array.indexof/indexof.js'
#include '../node_modules/@extendscript/aes.patch.array.isarray/isarray.js'
#include '../node_modules/@extendscript/aes.patch.object.keys/keys.js'
#include '../node_modules/@extendscript/aes.patch.json/json.js'
#include '../node_modules/@extendscript/aes.patch.json.clone/clone.js'
#include '../node_modules/@extendscript/aes.patch.json.instantiate/instantiate.js'
#include '../node_modules/@extendscript/aes.patch.json.validate/validate.js'
#include '../node_modules/@extendscript/aes.util.jaw/jaw.js'
#include '../jaxon.js'
#include './jaxonLoader.js' // Conatains test-data

// Load fresh instance of Jaxon 
var Manager = Jaxon.init(testFileName, Schema, standardPresets);

var testPreset04 = { name  : "[ Test 04 ]",
                     bool  : false,
                     arr   : [8,9,10,11],
                     obj   : { x : 1, y : 2 },
                     num   : 1 };

Manager.Presets.add(testPreset04);
Manager.Presets.add(testPreset04, {position: 1});

$.writeln( Manager.Presets.getByIndex( -1 ).name == "[ Test 04 ]" && Manager.Presets.getByIndex( 1 ).name == "[ Test 04 ]" );
