function sameArrayPositions( arr1, arr2 ) {
    var arr1len = arr1.length-1;
    var arr2len = arr2.length-1;
    if(arr1len != arr2len) return false;

    for(var i = 0; i < arr1len; i++) {
        if(arr1[i] !== arr2[i]) return false;
    };
    return true;
};

var LoadCallback = function ( err, module ){
    // Throws an error when dependency could not be loaded...
    if( err instanceof Error || err instanceof TypeError ) {
        throw new TypeError( err.message, $.fileName, $.line );
    };
    return module;
};

// Load jaxon
var Jaxon = Sky.getUtil("jaxon", LoadCallback);

// TestData

var testFileName = "Jaxon_Test";

var Schema = {
  "type": "object",
  "properties": {
    "name": { "type": "string", "default": "New Preset"  },
    "bool": { "type": "boolean" },
    "arr":  { "type": "array"   },
    "obj":  { "type": "object",
      "properties": {
        "x": { "type": "number", "default": 0 },
        "y": { "type": "number", "default": 0 }
      }
    },
    "num": { "type": "number", "default": 0 }
  }
}

var testPreset01 = { name  : "Test 01",
                     bool  : true,
                     arr   : [1,2,3,4],
                     obj   : { x : 1, y : 2 },
                     num   : 1.11 };
var testPreset02 = { name  : "Test 02",
                     bool  : false,
                     arr   : [5,6,7,8],
                     obj   : { x : 10, y : 20 },
                     num   : 11.1 };
var testPreset03 = { name  : "Test 03",
                     bool  : true,
                     arr   : [9,10,11,12],
                     obj   : { x : 100, y : 200 },
                     num   : 111 };

var standardPresets = [testPreset01,testPreset02,testPreset03];

// Load a new instance of Jaxon
var Manager = Jaxon.init(testFileName, Schema, standardPresets);

Manager.Presets.removeFromDisk(); // Force clean before test
