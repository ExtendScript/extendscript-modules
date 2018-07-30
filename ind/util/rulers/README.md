# rulers

> InDesign Utility

The rulers utility adds the `rulers.set()` method. This method sets rulers to the desired units. It returns the original ruler-settings which we can pass back to reset the rulers to original state.

## Install

    npm install @extendscript/ind.util.rulers

## Use

Set and reset the ruler:

    // Load the ruler util
    var Rulers = Sky.getUtil("rulers");
    
    // Set document ruler units to mm
    // and save original settings
 
    var OriginalSettings = Rulers.set( app.activeDocument, {units: "mm"} );
    
    // Do stuff...
    
    // Revert to original ruler units
    Rulers.set( Doc, originalSettings );


## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
