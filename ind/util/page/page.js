(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "page";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start page class

    function moduleClass() {
        var page = this;

        page.version = VERSION;
        page.description = "Some page tools for InDesign";

        page.getInfo( pageSpread, units ) {
            // Creates a page info object using units
            // returns an object, more properties might be added later

            // Param: pageSpread: Object : page or spread
            // Param: units: String or Number: MeasureUnits

            var RulerUtil  = Sky.getUtil("rulers");
            var BoundsUtil = Sky.getUtil("bounds");
            
            var infoPage   = new Object(); // Our return object

            infoPage.page  = pageSpread;
            infoPage.kind  = pageSpread.constructor.name;
            infoPage.units = units;

            // Get a reference to the parent document
            switch (infoPage.kind) {
                case "Page":
                    infoPage.parentDoc = pageSpread.parent.parent;
                    // Find out if page is first, last or middle here
                    break;
                case "Spread":
                    infoPage.parentDoc = pageSpread.parent;
                    break;
                default:
                    return new Error("Expected Page or Spread but received " + infoPage.kind);
            };

            // set-n-safe original rulers
            var prevRulers = RulerUtil.set(infoPage.parentDoc, units);
            
            // measure the page
            var boundsInfo = BoundsUtil.getInfo(infoPage.page.bounds);
            // Update infoPage with measures
            infoPage.bounds = boundsInfo.bounds;
            infoPage.width  = boundsInfo.width;
            infoPage.height = boundsInfo.height;

            // Get page bleed and slug settings
            switch (infoPage.kind) {
                case "Page":
                    // Find out if page is first, last or middle here
                    infoPage.bleedBounds = undefined;
                    infoPage.slugsBounds = undefined;
                    break;
                case "Spread":
                    infoPage.bleedBounds = undefined;
                    infoPage.slugsBounds = undefined;
                    break;
                default:
                    // This should never happen...
                    return new Error("Expected Page or Spread but received " + infoPage.kind);
            };

            // reset original rulers
            RulerUtil.set(infoPage.parentDoc, prevRulers);

            return infoPage;
        };

        page.getByLabel = function( pagesArr, labelStr, allBool ) {
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
    // End page class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
