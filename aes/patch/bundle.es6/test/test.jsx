#include '../bundle.es6.js'

var loaded = false;

if ( Array.prototype.every &&
     Array.prototype.filter &&
     Array.prototype.forEach &&
     Array.prototype.indexOf &&
     Array.isArray &&
     Array.prototype.lastIndexOf &&
     Array.prototype.map &&
     Array.prototype.reduce &&
     Array.prototype.some &&
     Function.prototype.bind &&
     Object.create &&
     Object.defineProperties &&
     Object.defineProperty &&
     Object.freeze &&
     Object.getOwnPropertyDescriptor &&
     Object.getOwnPropertyNames &&
     Object.getPrototypeOf &&
     Object.isExtensible &&
     Object.isFrozen &&
     Object.isSealed &&
     Object.keys &&
     Object.preventExtensions &&
     Object.seal &&

     /* ES6 */ 
     Array.from &&
     Object.assign &&
     Number.isFinite ){

    loaded = true;
}

$.writeln( loaded === true );