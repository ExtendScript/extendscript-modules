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

// Load a fresh instance of Jaxon
var Manager = Jaxon.init(testFileName, Schema, standardPresets);

$.writeln( Manager.Presets.getByIndex(  1 ).name === Manager.Presets.getByIndex( -2 ).name );
