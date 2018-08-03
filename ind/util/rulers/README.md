# rulers

> InDesign Utility

The rulers utility adds the `rulers.set()` method. This method sets rulers to the desired units. It returns the original ruler-settings which we can pass back to reset the rulers to original state.

## Install

    npm install @extendscript/ind.util.rulers

## Use

Load the module

    var Rulers = Sky.getUtil("rulers");

### set()

    Rulers.set( app.activeDocument, "INCHES");

The `set()` function returns the state of the rulers BEFORE the update, making it easy to reset the ruler back to original state:

    // Set document ruler units to mm and save original settings
 
    var PrevState = Rulers.set( app.activeDocument, "mm");
	
    Rulers.set( app.activeDocument, MeasurementUnits.INCHES);

    // Revert to original ruler units
    Rulers.set( Doc, PrevState );

### get()

With the `get` function you can get the current ruler state:

    Rulers.get( Doc )

Returns an object with the following keys:

  * xruler
  * yruler
  * origin
  * zeroPoint

### indUnitsFrom()

You can get the indesign `MeasurementUnits` value from a string or number:

    // MeasurementUnits.MILLIMETERS
    Rulers.indUnitsFrom( mm ); // returns 2054188905

### niceNameFor()

And as those unit values are generallt not nice to use in user interfaces we add a niceNameFor function that can return the nice name in long and short form:

    // Returns "points"
    Rulers.niceNameFor(MeasurementUnits.POINTS)
    Rulers.niceNameFor("pt")
 
    // Returns abbreviated version "pt"
    Rulers.niceNameFor(MeasurementUnits.POINTS, true)
    Rulers.niceNameFor("Points", true)

### convert()

The module can also convert unit values.

    var value = Rulers.mm2inch( 10 ) // returns 0.393701

Here is a list of some that are supported right now: `q2mm`, `q2inch`, `inch2q`, `ha2mm`, `apt2mm`, `mm2pt`, `mil2inch`, `inch2mil`, `mm2inch`, `inch2mm`, `inch2u`, `u2inch`, `inch2cm`, `cm2inch`, `inch2pt`, `inch2ag`, `ag2inch`, `pt2inch`, `c2inch`, `p2inch`, `inch2p`, `p2pt`, `pt2p`, `inch2c`, `pt2apt`, `pt2mm`, `inch2px`, `mm2px`, `cm2px`, `pt2px`, `apt2px`, `ag2px`, `c2px`, `mil2px`, `p2px`, `ha2px`, `q2px`, `u2px`. 

Sometimes it is easier to use the convert function.

    // Convert measure to points
    Ruler.measure2pt = function(10, "mm")
    
    // Or use the general convert funtion
    Ruler.convert( measure, currentUnit, toUnit, roundDec)

### numToGridStep()

You can also round values to closest grid value for grid bases work.

    var aligned = Rulers.numToGridStep( value, gridStep )

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
