#include "../array.isarray.js"

var testData = {
    "obj": { "this":"is", "a":"test", "object":true},
    "arr": ["This","is","a","test","array"]
};

$.writeln( Array.isArray(testData.arr) === true);
