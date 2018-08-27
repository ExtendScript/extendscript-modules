# layer

[![version](https://img.shields.io/npm/v/@extendscript/ind.util.layer.svg)](https://www.npmjs.org/package/@extendscript/ind.util.layer)

> InDesign Utility

Some layer utilities for InDesign

## Install

    npm install @extendscript/ind.util.layer

## Include

    #include 'node_modules/@extendscript/ind.util.layer/layer.js'

## Use

Load the module

    var LayerUtil = Sky.getUtil("layer");

### Methods

  * get( `Doc`, `layerRefOrName`, *`createBool`* )
  * select( `Doc`, `layerRefOrName`, *`createBool`* )
  * move( `Doc`, `layerRefOrName`, `afterlayerNo`, *`createBool`* ) 
  * moveAndSelect( `Doc`, `layerRefOrName`, `afterLayerNo`, *`createBool`* )
  * locker( `layerRef`, *`lockBool`* )
  * validOr( `LayerRef`, `orValue`)

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
