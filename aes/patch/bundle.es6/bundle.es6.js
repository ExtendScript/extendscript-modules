// ExtendScript Polyfill ES6 bundle
// https://github.com/ExtendScript/extendscript-modules

// Get ExtendScript to ES5
#include 'node_modules/@extendscript/aes.patch.bundle.es5/es5.js'
// ES6 from here
#include 'node_modules/@extendscript/aes.patch.array.from/from.js'
#include 'node_modules/@extendscript/aes.patch.object.assign/assign.js'
#include 'node_modules/@extendscript/aes.patch.number.isfinite/isfinite.js'
