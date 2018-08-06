# rulers

> InDesign Utility

The rulers utility adds the `rulers.set()` method. This method sets rulers to the desired units. It returns the original ruler-settings which we can pass back to reset the rulers to original state.

## Install

    npm install @extendscript/ind.util.rulers

## Use

Load the module

    var Rulers = Sky.getUtil("rulers");

### set

    Rulers.set( app.activeDocument, "INCHES");

The `set()` function returns the state of the rulers BEFORE the update, making it easy to reset the ruler back to original state:

    // Set document ruler units to mm and save original settings
 
    var PrevState = Rulers.set( app.activeDocument, "mm");
	
    Rulers.set( app.activeDocument, MeasurementUnits.INCHES);

    // Revert to original ruler units
    Rulers.set( Doc, PrevState );

### get

With the `get` function you can get the current ruler state:

    Rulers.get( Doc )

Returns an object with the following keys:

  * xruler
  * yruler
  * origin
  * zeroPoint

### indUnitsFrom

You can get the indesign `MeasurementUnits` value from a string or number:

    // MeasurementUnits.MILLIMETERS
    Rulers.indUnitsFrom( mm ); // returns 2054188905

### niceNameFor

As unit values are generally not nicely formatted for user interfaces we added the `niceNameFor()` function that return the user friendly name in long or short form:

    // Returns "points"
    Rulers.niceNameFor(MeasurementUnits.POINTS)
    Rulers.niceNameFor("pt")
 
    // Returns abbreviated version "pt"
    Rulers.niceNameFor(MeasurementUnits.POINTS, true)
    Rulers.niceNameFor("Points", true)

### convert

The Rulers module can also convert unit values:

    Ruler.convert( measure, fromUnit, toUnit )


### numToGridStep

You can also round values to closest grid value for grid bases work.

    var aligned = Rulers.numToGridStep( value, gridStep )

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
