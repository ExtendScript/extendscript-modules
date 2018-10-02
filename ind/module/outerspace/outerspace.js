(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "slugs";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start slugs class

    function moduleClass() {
        var slugs = this;

        slugs.version = VERSION;
        slugs.description = "Slug tools for InDesign";
        
        var LoadCallback = function ( err, module ){
            // Throws an error when dependency could not be loaded...
            if( err instanceof Error || err instanceof TypeError ) {
                throw new TypeError( err.message, $.fileName, $.line );
            };
            return module;
        };

        // Load any needed dependencies
        var Rulers = Sky.getUtil("rulers", LoadCallback );

        //- - - - - - - - - - - - - - - - - - - - - - 
        // Module code here...
        //- - - - - - - - - - - - - - - - - - - - - - 

        slugs.getMeasureParagraphStyle = function( options ) {
            var doc = options.doc || undefined;
            
            return true;
        };

        slugs.getValues = function( Doc, Units ){
            // Returns array of measurements in `Units`
            // In a similar fashion as geometricBounds
            // [Left, Top, Right, Bottom]

            // Set and save document ruler units
            var originalState = Rulers.set( Doc, Units );
            
            var slugSizes = [ Doc.documentPreferences.slugBottomOffset,
                              Doc.documentPreferences.slugInsideOrLeftOffset,
                              Doc.documentPreferences.slugRightOrOutsideOffset,
                              Doc.documentPreferences.slugTopOffset];
            };

            Rulers.set( Doc, originalState );

            return maxSlug;
        };

        slugs.getMax = function( Doc, Units ){
            //This function returns the maximum slug size in `Units`
            var slugSizes = slugs.getValues( Doc, Units );
            return Math.max( slugSizes[0], slugSizes[1], slugSizes[2], slugSizes[3] );
        };

        slugs.getMin = function( Doc, Units ){
            //This function returns the maximum slug size in `Units`
            var slugSizes = slugs.getValues( Doc, Units );
            return Math.min( slugSizes[0], slugSizes[1], slugSizes[2], slugSizes[3] );
        };

    };

    //--------------------------
    // End slugs class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
