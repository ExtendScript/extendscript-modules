(function () {
    var VERSION = 1.0;
    var MODULE_PATH = "pages";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start pages class

    function moduleClass() {
        var pages = this;

        pages.version = VERSION;
        pages.description = "Some page tools for InDesign";

        pages.getInfo = function( pageSpread, units ) {
            // Creates and returned the page info object
            var infoPage   = new Object();
            // Param: pageSpread: Object : page or spread
            // Param: units: String, Number or MeasureUnits
            // defaults to points
            infoPage.units = ( units === undefined) ? "pt" : units;
  
            var RulerUtil  = Sky.getUtil("rulers");
            var BoundsUtil = Sky.getUtil("bounds");

            infoPage.kind  = pageSpread.constructor.name;
            infoPage.units = units;
            var spread    = (infoPage.kind === "Page") ? pageSpread.parent : pageSpread;
            var parentDoc = spread.parent;

            // set-n-safe original rulers
            var prevRulers = RulerUtil.set(parentDoc, units);
            
            // measure the page
            var boundsInfo = BoundsUtil.getInfo(pageSpread.bounds);
            // Update infoPage with measures
            infoPage.bounds = boundsInfo.bounds;
            infoPage.width  = boundsInfo.width;
            infoPage.height = boundsInfo.height;

            // Get page bleed and slug settings [y1, x1, y2, x2]
            var docPref = parentDoc.documentPreferences;
            
            var growBounds = function( boundsArr1, boundsArr2 ){
                return [ boundsArr1[0]-boundsArr2[0], boundsArr1[1]-boundsArr2[1],
                         boundsArr1[2]+boundsArr2[2], boundsArr1[3]+boundsArr2[3] ];
            };

            if (infoPage.kind === "Page" && docPref.facingPages && pageSpread.side == PageSideOptions.LEFT_HAND ) {
                // LEFT_HAND Facing pages...
                infoPage.bleedBounds = growBounds(infoPage.bounds,
                  [ docPref.documentBleedTopOffset,
                    docPref.documentBleedOutsideOrRightOffset,
                    docPref.documentBleedInsideOrLeftOffset,
                    docPref.documentBleedBottomOffset ]);
                infoPage.slugsBounds = growBounds(infoPage.bleedBounds,
                  [ docPref.slugTopOffset,
                    docPref.slugRightOrOutsideOffset,
                    docPref.slugInsideOrLeftOffset,
                    docPref.slugBottomOffset ]);
            } else { // RIGHT_HAND or SINGLE_SIDED
                infoPage.bleedBounds = growBounds(infoPage.bounds,
                  [ docPref.documentBleedTopOffset,
                    docPref.documentBleedInsideOrLeftOffset,
                    docPref.documentBleedOutsideOrRightOffset,
                    docPref.documentBleedBottomOffset ]);
                infoPage.slugsBounds = growBounds(infoPage.bleedBounds,
                  [ docPref.slugTopOffset,
                    docPref.slugInsideOrLeftOffset,
                    docPref.slugRightOrOutsideOffset,
                    docPref.slugBottomOffset ]);
            };

            // reset original rulers
            RulerUtil.set(parentDoc, prevRulers);

            return infoPage;
        };

        pages.getByLabel = function( pagesArr, labelStr, keyOption ) {
            // Param pagesArr  : Array   : of pages (e.g. doc.pages or doc.masterSpreads[0].pages )
            // Param labelStr  : String  : the page label
            // Param keyOption : String or Object  : key or object with key 
                                 // key : String, the key to the label, Default undefined
                                 // any : Boolean, return both key-label matches and unkeyed label matches
            // Returns : Array with matches

            var options = {key: undefined, any: false};
            switch (typeof keyOption) {
                case "string":
                    options.key = keyOption;
                    break;
                case "object":
                    if( keyOption.hasOwnProperty('key') && typeof keyOption.key === 'string' ) options.key = keyOption.key;
                    if( keyOption.hasOwnProperty('any') && typeof keyOption.any === 'boolean') options.any = keyOption.any;
                    break;
                default:
                    break;
            };

            var fffound = new Array();

            for ( i=0; pagesArr.length > i; i++ ) {
                var page = pagesArr.item(i);
                if( options.key ) {
                    if( page.extractLabel(options.key) === labelStr ) {
                        fffound.push( page );
                    } else if( options.any && page.label === labelStr ) {
                        fffound.push( page );
                    }
                } else { // No key defined
                    if( page.label === labelStr ){
                        fffound.push( page );
                    };
                };
            };
            return fffound;
        };
    };

    //--------------------------
    // End pages class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
