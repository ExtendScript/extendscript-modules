# outerspace

[![version](https://img.shields.io/npm/v/@extendscript/ind.module.outerspace.svg)](https://www.npmjs.org/package/@extendscript/ind.module.outerspace)

> Module

Bleed and Slug tools for InDesign.

> This is an opinionated tool to deal with items in the slugs. I might split the more basic functions to `ind.util.bleeds` and `ind.util.slugs` later pending how big and usefull it's utils are.

## Install

    npm install @extendscript/ind.module.outerspace

## Include

    #include 'node_modules/@extendscript/ind.module.outerspace/outerspace.js'

## Use

Load the module by creating a reference.

    var OuterSpace = Sky.getModule("outerspace")

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
