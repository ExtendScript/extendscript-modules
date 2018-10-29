# groupList

[![version](https://img.shields.io/npm/v/@extendscript/sui.util.groupList.svg)](https://www.npmjs.org/package/@extendscript/sui.util.groupList)

> Utility

Attaches a scrollable panel/group list to a SUI Window.

## Install

    npm install @extendscript/sui.util.groupList

## Include

    #include 'node_modules/@extendscript/sui.util.groupList/groupList.js'

## Use

Load the module by creating a reference.

    var groupList = Sky.getUtil("groupList")

Then attach a new list to your window:

    var scrollPanel = Win.add( new groupList(location, pgCreator, Options) )

### Paremeters

#### location

The SUI location to attach the list. This can be a `Window`, `Panel` or `Group`.

#### pgCreator

A function that return a panel or group. The returning item will be added to the list.

#### Options

An Object with Settings:

  * `useScroll`
  * `scrollCount`

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
