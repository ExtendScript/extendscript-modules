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

        pages.getInfo( pageSpread, units ) {
            // Creates and returned the page info object
            var infoPage   = new Object();
            // Param: pageSpread: Object : page or spread
            // Param: units: String, Number or MeasureUnits
            // defaults to points
            infoPage.units = (typeof units === 'undefined')? "pt" : units;
  
            var RulerUtil  = Sky.getUtil("rulers");
            var BoundsUtil = Sky.getUtil("bounds");

            infoPage.page  = pageSpread;
            infoPage.kind  = pageSpread.constructor.name;
            infoPage.units = units;
            infoPage.spread    = (infoPage.kind === "Page") ? pageSpread.parent : pageSpread;
            infoPage.parentDoc = infoPage.spread.parent;

            // set-n-safe original rulers
            var prevRulers = RulerUtil.set(infoPage.parentDoc, units);
            
            // measure the page
            var boundsInfo = BoundsUtil.getInfo(infoPage.page.bounds);
            // Update infoPage with measures
            infoPage.bounds = boundsInfo.bounds;
            infoPage.width  = boundsInfo.width;
            infoPage.height = boundsInfo.height;
            
            // Get page bleed and slug settings [y1, x1, y2, x2]
            var docPref = infoPage.parentDoc.documentPreferences;
            
            if (infoPage.kind === "Page" && docPref.facingPages && infoPage.page.side == PageSideOptions.LEFT_HAND ) {
                // LEFT_HAND Facing pages...
                infoPage.bleedBounds = BoundsUtil.grow(infoPage.bounds,
                  [ docPref.documentBleedTopOffset,
                    docPref.documentBleedOutsideOrRightOffset,
                    docPref.documentBleedInsideOrLeftOffset,
                    docPref.documentBleedBottomOffset ]);
                infoPage.slugsBounds = BoundsUtil.grow(infoPage.bleedBounds,
                  [ docPref.slugTopOffset,
                    docPref.slugRightOrOutsideOffset,
                    docPref.slugInsideOrLeftOffset,
                    docPref.slugBottomOffset ]);
            } else { // RIGHT_HAND or SINGLE_SIDED
                infoPage.bleedBounds = BoundsUtil.grow(infoPage.bounds,
                  [ docPref.documentBleedTopOffset,
                    docPref.documentBleedInsideOrLeftOffset,
                    docPref.documentBleedOutsideOrRightOffset,
                    docPref.documentBleedBottomOffset ]);
                infoPage.slugsBounds = BoundsUtil.grow(infoPage.bleedBounds,
                  [ docPref.slugTopOffset,
                    docPref.slugInsideOrLeftOffset,
                    docPref.slugRightOrOutsideOffset,
                    docPref.slugBottomOffset ]);
            };

            // reset original rulers
            RulerUtil.set(infoPage.parentDoc, prevRulers);

            return infoPage;
        };

        pages.getByLabel = function( pagesArr, labelStr, allBool ) {
            // Param pagesArr  : Array   : of pages (e.g. doc.pages or doc.masterSpreads[0].pages )
            // Param labelStr : String  : the page label
            // Param allBool     : Boolean : Return all pages?
            // Returns : If allBool is true return array with all pages that have label labelStr or empty array.
            //           If allBool is false return the first found page that has label labelStr or null.

            var allBool = allBool === true;
            var fffound = new Array();

            for ( i=0; pagesArr.length > i; i++ ){
                if( pagesArr.item(i).label == labelStr ){
                    if( allBool ) {
                        fffound.push( pagesArr.item(i) );
                    } else {
                       return pagesArr.item(i); 
                    };
                };
            };
            if( allBool ) {
                return fffound;
            } else {
                return null;
            };
        };
    };

    //--------------------------
    // End pages class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
