# ruler

> InDesign Utility

The ruler utility adds the `ruler.set()` method. This method sets both rulers to the desired units. It returns the original ruler-settings which we can pass back to reset the rulers to original state.

## Install

    npm install @extendscript/ind.util.ruler

## Use

Set and reset the ruler:

    // Load the ruler util
    var Ruler = Sky.getUtil("ruler");
    
    // Set document ruler units to mm
    // and save original settings
 
    var OriginalSettings = Ruler.set( app.activeDocument, {units: "mm"} );
    
    // Do stuff...
    
    // Revert user units
    Ruler.set( Doc, originalSettings );


## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
