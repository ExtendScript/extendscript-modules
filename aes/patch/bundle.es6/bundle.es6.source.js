// ExtendScript Polyfill ES6 bundle
// https://github.com/ExtendScript/extendscript-modules

// Get ExtendScript to ES5
#include 'node_modules/@extendscript/aes.patch.bundle.es5/bundle.es5.js'
// ES6 from here
#include 'node_modules/@extendscript/aes.patch.array.from/array.from.js'
#include 'node_modules/@extendscript/aes.patch.object.assign/object.assign.js'
#include 'node_modules/@extendscript/aes.patch.number.isfinite/number.isfinite.js'
