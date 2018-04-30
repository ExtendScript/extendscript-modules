# AES.PATCH scope
This is a collection of polyfills for [ExtendScript](https://en.wikipedia.org/wiki/ExtendScript). Later editions of ECMAScript bring some useful new scripting features, and since they're syntactically compatible with older JavaScript engines they can mostly be polyfilled by patching methods onto built-in JS objects.

> We prefer to use polyfills [from MDN](https://developer.mozilla.org/en-US/) when available. ([Discussed here](https://github.com/ExtendScript/extendscript-es6-shim/issues/1))

## Bundles
A couple of bundles of modules often used together.

  - [ ] bundle.array
  - [ ] bundle.es3-6
  - [ ] bundle.es5
  - [ ] bundle.es6
  - [ ] bundle.object

## Shims
Modules that faithfully represent newer ECMAScript features.

  - [x] Array.from
  - [x] Array.isArray
  - [ ] Array.prototype.filter
  - [ ] Array.prototype.find
  - [ ] Array.prototype.forEach
  - [x] Array.prototype.indexOf
  - [ ] Array.prototype.lastIndexOf
  - [ ] Array.prototype.map
  - [ ] Array.prototype.reduce
  - [ ] Array.prototype.reduceRight
  - [ ] Array.prototype.some
  - [ ] JSON
  - [ ] Number.isFinite
  - [ ] Object.assign
  - [ ] Object.create
  - [ ] Object.keys
  - [ ] String.trim

## Shams
Modules that partially implements newer ECMAScript features.

  - [ ] Function.bind
  - [ ] Object.defineProperties
  - [ ] Object.defineProperty
  - [ ] Object.freeze
  - [ ] Object.getOwnPropertyDescriptor
  - [ ] Object.getOwnPropertyNames
  - [ ] Object.getPrototypeOf
  - [ ] Object.isExtensible
  - [ ] Object.isFrozen
  - [ ] Object.isSealed
  - [ ] Object.preventExtensions
  - [ ] Object.seal
  - [ ] Object.setPrototypeOf

## Fills
Modules that we get used to in other environments.

  - [ ] clearInterval
  - [ ] clearTimeout
  - [ ] console.log
  - [ ] setInterval
  - [ ] setTimeout

## Extensions
Extensions to existing objects

  - [ ] JSON.clone
  - [ ] JSON.cycle
  - [ ] JSON.file
  - [ ] JSON.parseRecurse
  - [ ] JSON.parseState


## More info

Read [the docs](../docs/README.md)

