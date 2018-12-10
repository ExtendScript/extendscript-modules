# jaw

[![version](https://img.shields.io/npm/v/@extendscript/aes.util.jaw.svg)](https://www.npmjs.org/package/@extendscript/aes.util.jaw)

> Object Manager

Jaw is a data controller that wraps JSON objects with JSON-schema. It provides an easy to use, chaining API for managing JSON instances in ExtendScript.

## Install

    npm install @extendscript/aes.util.jaw

## Include

    #include 'node_modules/@extendscript/aes.util.jaw/jaw.js'

## Use

Load the module by creating a reference.

    var Jaw = Sky.getUtil("jaw")

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
