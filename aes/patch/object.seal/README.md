# object.seal

> ES5 Sham

The Object.seal() method seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable.

Source: [ps-scripting-es5shim](https://github.com/EugenTepin/ps-scripting-es5shim/blob/master/lib/Object/seal.js)

## Test

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)