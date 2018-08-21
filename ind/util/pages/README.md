# pages

[![version](https://img.shields.io/npm/v/@extendscript/ind.util.pages.svg)](https://www.npmjs.org/package/@extendscript/ind.util.pages)

> Utility

Some page tools for InDesign

## Install

    npm install @extendscript/ind.util.pages

## Include

    #include 'node_modules/@extendscript/ind.util.pages/pages.js'

## Use

Load the module by creating a reference.

    var page = Sky.getUtil("pages")

### getInfo( `page_or_spread`, _`units`_ )

Returns an info object like the one outlined below. The units parameter is optional and defaults to points:  

    {
      "units"  : "mm",
      "kind"   : "Page",
      "bounds" : [0,0,100,100],
      "width"  : 100,
      "height" : 100,
      "bleedBounds" : [-5,-5,105,105],
      "slugsBounds" : [-15,-15,115,115]
    }

### getByLabel( `pagesArr`, `labelStr`, _`keyOption`_  )

Returns an array of pages found that matches `labelStr`.


## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
