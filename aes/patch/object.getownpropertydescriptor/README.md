# object.getownpropertydescriptor

[![version](https://img.shields.io/npm/v/@extendscript/aes.patch.object.getownpropertydescriptor.svg)](https://www.npmjs.org/package/@extendscript/aes.patch.object.getownpropertydescriptor)

> ES5 Sham

The `Object.getOwnPropertyDescriptor()` method returns a property descriptor for an own property (that is, one directly present on an object and not in the object's prototype chain) of a given object.

Source: [ps-scripting-es5shim](https://github.com/EugenTepin/ps-scripting-es5shim/blob/master/lib/Object/getOwnPropertyDescriptor.js)

## Install

    npm install @extendscript/aes.patch.object.getownpropertydescriptor

## Include

    #include 'node_modules/@extendscript/aes.patch.object.getownpropertydescriptor/getownpropertydescriptor.js'

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
