# layer

> InDesign Utility

Some layer utilities for InDesign

# Install

    npm install @extendscript/ind.util.layer

## Functions

  * layer.getByName( `doc`, `layerName`, *`createBool`* )
  * layer.getSelect( `doc`, `layerName`, *`createBool`* )
  * layer.getSelectMove( `doc`, `layerName`, `afterlayerNo`, *`createBool`* )
  * layer.locker( `layerRef`, *`lockBool`* )
  * layer.move( `layerRef`, `afterlayerNo` )
  * layer.select( `layerRef` )

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
