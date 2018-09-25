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

### Get Parent

  * getParentPage ( `PageItem` )

Returns the parent page of `PageItem` or `Error` 

  * getParentSpread ( `PageItem` )

Returns the parent spread of `PageItem` or `Error` 

  * getParentDoc ( `PageItem` )

Returns the parent document of `PageItem` or `Error` 

### Add Pageitem

  * addTextFrame ( `SpreadPage`, `Options` )

Adds and returns a new Textframe on `SpreadPage`

  * addRect ( `SpreadPage`, `Options` )

Adds and returns a new Rectangle on `SpreadPage`

  * addRectToPage ( `SpreadPage`, `Options` )

Adds and returns a new rectangle to the bounds of `SpreadPage`

  * addRectToBleed ( `SpreadPage`, `Options` )

Adds and returns anew rectangle to the bleed bounds of SpreadPage

### Update Bounds

  * boundsToRef ( `pageItems`, `Reference` )

Set bounding box of pageItems to Reference bounds; Any reference that has the `geometricBounds` property, uses parentPage if not defined.

  * boundsToBleed ( `pageItems `, `SpreadPage` )

Updates bounding box of `pageItems` to `SpreadPage` bleed.


## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
