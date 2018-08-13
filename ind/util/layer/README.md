# layer

> InDesign Utility

Some layer utilities for InDesign

# Install

    npm install @extendscript/ind.util.layer

## Use

Load the module

    var LayerUtil = Sky.getUtil("layer");

### Methods

  * getByName( `doc`, `layerName`, *`createBool`* )
  * getSelect( `doc`, `layerName`, *`createBool`* )
  * getSelectMove( `doc`, `layerName`, `afterlayerNo`, *`createBool`* )
  * locker( `layerRef`, *`lockBool`* )
  * move( `layerRef`, `afterlayerNo` )
  * select( `layerRef` )

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
