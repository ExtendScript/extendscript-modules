# jaxon

[![version](https://img.shields.io/npm/v/@extendscript/sui.module.jaxon.svg)](https://www.npmjs.org/package/@extendscript/sui.module.jaxon)

> Module

Jaxon is an ExtendScript Preset Manager that uses [JSON-schema](http://json-schema.org/) to keep presets validated. It loads/saves presets to and from the user data-folder.

## Install

    npm install @extendscript/sui.module.jaxon

## Include

    #include 'node_modules/@extendscript/sui.module.jaxon/jaxon.js'

## Use

1. Load the module by creating a reference.

    `var Jaxon = Sky.getUtil("jaxon")`

2. Create a new Preset Manager by initialising the filename and JSON-Schema:

    `var presetManager = Jaxon.init( "file_name.json", schema);`

3. Create `get()` and `set()` functions that move data in and out of your interface and attach them to your `DataPort`

    `var MyDataPort = { getData: get, renderData: set }`

4. Now attach the widget to your interface:

    `presetManager.Widget.attachTo( Window, KeyID, MyDataPort );`

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
