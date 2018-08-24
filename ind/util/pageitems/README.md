# pageitems

[![version](https://img.shields.io/npm/v/@extendscript/ind.util.pageitems.svg)](https://www.npmjs.org/package/@extendscript/ind.util.pageitems)

> InDesign Utility

Utilities that create or target page items in InDesign.

## Install

    npm install @extendscript/ind.util.pageitems

## Include

    #include 'node_modules/@extendscript/ind.util.pageitems/pageitems.js'

## Use

    var Pageitems = Sky.getUtil("pageitems");

### getParentPage ( `PageItem` )

Returns the parent page of `PageItem` or `Error` 

### getParentSpread ( `PageItem` )

Returns the parent spread of `PageItem` or `Error` 

### getParentDoc ( `PageItem` )

Returns the parent document of `PageItem` or `Error` 


## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
