# bounds

[![version](https://img.shields.io/npm/v/@extendscript/ind.util.bounds.svg)](https://www.npmjs.org/package/@extendscript/ind.util.bounds)

> Utility

Some utils for transforming InDesign bounds arrays.

## Install

    npm install @extendscript/ind.util.bounds

## Include

    #include 'node_modules/@extendscript/ind.util.bounds/bounds.js'

## Use

Load the module by creating a reference.

    var bounds = Sky.getUtil("bounds")

### getInfo( `bounds` )

This function collects some extra data from the bounds. It returns an object with the following keys:

  * bounds `Array` (`[y1, x1, y2, x2]`)
  * height `Number`
  * width `Number`
  * topLeft `Object` (`{x: Number, y: Number}`)
  * topCenter `Object` (`{x: Number, y: Number}`)
  * topRight `Object` (`{x: Number, y: Number}`)
  * midLeft `Object` (`{x: Number, y: Number}`)
  * midCenter `Object` (`{x: Number, y: Number}`)
  * midRight `Object` (`{x: Number, y: Number}`)
  * botLeft `Object` (`{x: Number, y: Number}`)
  * botCenter `Object` (`{x: Number, y: Number}`)
  * botRight `Object` (`{x: Number, y: Number}`)


### offset( `bounds`, `offset`)

Returns an `offset` (`[x,y]`) of `bounds` values.


### normalise( `bounds`, _`offset`_ )

Returns the normalised bounds (`[y1, x1, y2, x2]`). You can give it an optional offset. Either a single number or array that defines [x,y].

Therefore the given bounds `[10,11,20,21]` transform to `[0,0,10,10]` if no offset is given.
When we add `[1,2]` as offset we get `[2,1,12,11]`

### getRelativeOfset( `bounds`, `relativeToBounds` )

This function returns the relative ofset as an info object as described above (See `getInfo`).

    X--------X--------X
    |  |   |   |      |
    |--X---X---X------|
    |  |   |   |      |
    |--X---X---X------|
    X  |   | x |      X
    |--X---X---X------|
    |  |   |   |      |
    |  |   |   |      |
    |  |   |   |      |
    X--------X--------X
            
> BEWARE: This function expects both bounds to be in the same X-Y coordinate space and measure unit!


## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
