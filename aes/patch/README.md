# AES.PATCH scope
This is a collection of polyfills for [ExtendScript](https://en.wikipedia.org/wiki/ExtendScript). Later editions of ECMAScript bring some useful new scripting features, and since they're syntactically compatible with older JavaScript engines they can mostly be polyfilled by patching methods onto built-in JS objects.

> We prefer to use polyfills [from MDN](https://developer.mozilla.org/en-US/) when available. ([Discussed here](https://github.com/ExtendScript/extendscript-es6-shim/issues/1))


## Shims
Modules that faithfully represent newer ECMAScript features.

  - [x] Array.indexOf
  - [x] Array.isArray
  - [ ] Array.prototype.filter
  - [ ] Array.prototype.find
  - [ ] Array.prototype.forEach
  - [ ] Array.prototype.map
  - [ ] Array.prototype.reduce
  - [ ] Number.isFinite
  - [ ] Object.assign
  - [ ] Object.create
  - [ ] Object.keys


## Shams
Modules that partially implements newer ECMAScript features.

  - [ ] Object.defineProperties
  - [ ] Object.defineProperty
  - [ ] Object.freeze
  - [ ] Object.getOwnPropertyDescriptor
  - [ ] Object.getOwnPropertyNames
  - [ ] Object.getPrototypeOf
  - [ ] Object.isExtensible
  - [ ] Object.isFrozen
  - [ ] Object.isSealed
  - [ ] Object.seal
  - [ ] Object.setPrototypeOf


## Fills
Modules that we get used to in other environments.

  - [ ] clearInterval
  - [ ] clearTimeout
  - [ ] console.log
  - [ ] JSON.parse
  - [ ] JSON.stringify
  - [ ] setInterval
  - [ ] setTimeout


## More info

Read [the docs](../docs/README.md)

