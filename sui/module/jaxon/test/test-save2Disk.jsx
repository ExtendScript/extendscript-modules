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

var presetsFile = File( Manager.getPresetsFilePath() );

Manager.Presets.load([testPreset01,testPreset01,testPreset02,testPreset02,testPreset03]);

var tempPreset = { name  : "TEMP",
                   bool  : false,
                   arr   : [8,9,10,11],
                   obj   : { x : 1, y : 2 },
                   num   : 1 };

Manager.Presets.add(tempPreset, {temporary: true});
Manager.Presets.saveToDisk();
Manager.Presets.loadFromDisk();

$.writeln( presetsFile.exists === true && Manager.Presets.get().length == 5 );
