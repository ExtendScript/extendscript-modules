# object.getprototypeof

[![version](https://img.shields.io/npm/v/@extendscript/aes.patch.object.getprototypeof.svg)](https://www.npmjs.org/package/@extendscript/aes.patch.object.getprototypeof)

> ES5 Sham

The `Object.getPrototypeOf()` method returns the prototype (i.e. the value of the internal `Prototype` property) of the specified object.

Source: [ps-scripting-es5shim](https://github.com/EugenTepin/ps-scripting-es5shim/blob/master/lib/Object/getPrototypeOf.js)

## Install

    npm install @extendscript/aes.patch.object.getprototypeof

## Include

    #include 'node_modules/@extendscript/aes.patch.object.getprototypeof/getprototypeof.js'

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
