# AES.PATCH scope
This is a collection of polyfills for [ExtendScript](https://en.wikipedia.org/wiki/ExtendScript). Later editions of ECMAScript bring some useful new scripting features, and since they're syntactically compatible with older JavaScript engines they can mostly be polyfilled by patching methods onto built-in JS objects.

> We prefer to use polyfills [from MDN](https://developer.mozilla.org/en-US/) when available. ([Discussed here](https://github.com/ExtendScript/extendscript-es6-shim/issues/1))

## Bundles
A couple of bundles of modules often used together.

  - [x] [bundle.array](bundle.array)
  - [x] [bundle.es3-6](bundle.es3-6)
  - [x] [bundle.es5](bundle.es5)
  - [x] [bundle.es6](bundle.es6)
  - [x] [bundle.object](bundle.object)

## Shims
Modules that faithfully represent newer ECMAScript features.

  - [x] [Array.every](array.every)
  - [x] [Array.from](array.from)
  - [x] [Array.isArray](array.isarray)
  - [x] [Array.filter](array.filter)
  - [x] [Array.find](array.find)
  - [x] [Array.forEach](array.foreach)
  - [x] [Array.indexOf](array.indexof)
  - [x] [Array.lastIndexOf](array.lastindexof)
  - [x] [Array.map](array.map)
  - [x] [Array.reduce](array.reduce)
  - [x] [Array.reduceRight](array.reduceright)
  - [x] [Array.some](array.some)
  - [x] [JSON](json)
  - [x] [Number.isFinite](number.isfinite)
  - [x] [Number.isInteger](number.isinteger)
  - [x] [Object.assign](object.assign)
  - [x] [Object.create](object.create)
  - [x] [Object.keys](object.keys)
  - [x] [String.trim](string.trim)

## Shams
Modules that partially implements newer ECMAScript features.

  - [x] [Function.bind](function.bind)
  - [x] [Object.defineProperties](object.defineproperties)
  - [x] [Object.defineProperty](object.defineproperty)
  - [x] [Object.freeze](object.freeze)
  - [x] [Object.getOwnPropertyDescriptor](object.getownpropertydescriptor)
  - [x] [Object.getOwnPropertyNames](object.getownpropertynames)
  - [x] [Object.getPrototypeOf](object.getprototypeof)
  - [x] [Object.isExtensible](object.isextensible)
  - [x] [Object.isFrozen](object.isfrozen)
  - [x] [Object.isSealed](object.issealed)
  - [x] [Object.preventExtensions](object.preventExtensions)
  - [x] [Object.seal](object.seal)
  - [x] [Object.setPrototypeOf](object.setprototypeof)

## Fills
Modules that we get used to in other environments.

  - [x] [console.log](console.log)
  - [ ] [deepEqual](console.log)
  - [ ] [getType](gettype)
  - [ ] [isArrayLike](isArrayLike)

## Extensions
Extensions to existing objects

  - [x] [JSON.clone](json.clone)
  - [ ] [JSON.comparable](json.comparable)
  - [ ] [JSON.cycle](json.cycle)
  - [ ] [JSON.equals](json.equals)
  - [ ] [JSON.file](json.file)
  - [x] [JSON.instantiate](json.instantiate)
  - [ ] [JSON.parseRecurse](json.parserecurse)
  - [ ] [JSON.parseState](json.parsestate)
  - [x] [JSON.validate](json.validate)


## More info

Read [the docs](../../docs/README.md)

