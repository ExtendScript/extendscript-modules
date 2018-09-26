# pageitems

[![version](https://img.shields.io/npm/v/@extendscript/ind.util.pageitems.svg)](https://www.npmjs.org/package/@extendscript/ind.util.pageitems)

> InDesign Utility

Utilities that create or target page items in InDesign.

## Install

    npm install @extendscript/ind.util.pageitems

## Include

    #include 'node_modules/@extendscript/ind.util.pageitems/pageitems.js'

## Use

    var PageItems = Sky.getUtil("pageitems");

### Get Parent

Returns the requested Parent or `Error`:

  * getParentPage ( `PageItem` )
  * getParentSpread ( `PageItem` )
  * getParentDoc ( `PageItem` )
 

### Add Pageitem

Adds a new PageItem on `SpreadPage`:

  * addTextFrame ( `SpreadPage`, `Options` )
  * addRect ( `SpreadPage`, `Options` )

Adds a new PageItem on `SpreadPage` using `SpreadPage` bounds:

  * addRectToPage ( `SpreadPage`, `Options` )
  * addRectToBleed ( `SpreadPage`, `Options` )

### Update Bounds

Sets bounding box of `pageItems` to `Reference` bounds. (Any reference that has the `geometricBounds` property, uses parentPage if `undefined`):

  * boundsToRef ( `pageItems`, `Reference` )

Updates bounding box of `pageItems` to `SpreadPage` bleed:

  * boundsToBleed ( `pageItems `, `SpreadPage` )


## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
