# object.setprototypeof

[![version](https://img.shields.io/npm/v/@extendscript/aes.patch.object.setprototypeof.svg)](https://www.npmjs.org/package/@extendscript/aes.patch.object.setprototypeof.trim)

> ES5 Sham

The `Object.setPrototypeOf()` method sets the prototype (i.e., the internal `Prototype` property) of a specified object to another object or null.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

> __Warning__: Changing the `Prototype` of an object is, by the nature of how modern JavaScript engines optimize property accesses, a very slow operation, in every browser and JavaScript engine. The effects on performance of altering inheritance are subtle and far-flung, and are not limited to simply the time spent in `Object.setPrototypeOf(...)` statement, but may extend to any code that has access to any object whose `Prototype` has been altered. If you care about performance you should avoid setting the `Prototype` of an object. Instead, create a new object with the desired `Prototype` using [Object.create()](../object.create).

## Install

    npm install @extendscript/aes.patch.object.setprototypeof

## Include

    #include 'node_modules/@extendscript/aes.patch.object.setprototypeof/setprototypeof.js'

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
