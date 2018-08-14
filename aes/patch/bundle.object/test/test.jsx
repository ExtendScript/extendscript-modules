#include '../object.js'

var loaded = false;

if ( Object.assign                   &&
     Object.create                   &&
     Object.defineProperties         &&
     Object.defineProperty           &&
     Object.freeze                   &&
     Object.getOwnPropertyDescriptor &&
     Object.getOwnPropertyNames      &&
     Object.getPrototypeOf           &&
     Object.isExtensible             &&
     Object.isFrozen                 &&
     Object.isSealed                 &&
     Object.keys                     &&
     Object.preventExtensions        &&
     Object.seal                     &&
     Object.setPrototypeOf           ) {
    loaded = true;
}

$.writeln( loaded === true );