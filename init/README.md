# modules.init

[![version](https://img.shields.io/npm/v/@extendscript/modules.init.svg)](https://www.npmjs.org/package/@extendscript/modules.init)

This module creates the shared `Sky` object. A peer-dependency for most [ExtendScript Modules](../docs/API-Registry.md).


## Install

    npm install @extendscript/modules.init

## Include 

    #include 'node_modules/@extendscript/modules.init/init.js'  

## Use

Import this init module and any other module you'd like to use for your project:

  1. Load the init module which creates the `Sky` object:

    #include 'node_modules/@extendscript/modules.init/init.js'

  2. Add any other modules you'd like to use:

    #include 'node_modules/@extendscript/aes.bundle.array/array.js'
    #include 'node_modules/@extendscript/ind.util.rulers/rulers.js'

  3. Init the `Sky` to complete the setup:

    Sky.init();

> The `init` function is used to load any initialisation processes of _loaded_ modules. Meaning this module does not make use of it and is not specifically required.


## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## Contributers

  * [ExtendScript.org](https://github.com/ExtendScript)


## More info

Read [the docs](../docs/README.md)
