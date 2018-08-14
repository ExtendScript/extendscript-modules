# object.seal

[![version](https://img.shields.io/npm/v/@extendscript/aes.patch.object.seal.svg)](https://www.npmjs.org/package/@extendscript/aes.patch.object.seal)

> ES5 Sham

The Object.seal() method seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable.

> __WARNING__ Silently fails in ExtendScript. This should be fine unless you are depending on the safety and security provisions of this method.

Source: [ps-scripting-es5shim](https://github.com/EugenTepin/ps-scripting-es5shim/blob/master/lib/Object/seal.js)

## Install

    npm install @extendscript/aes.patch.object.seal

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
