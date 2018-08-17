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
        
        // Module code here...
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
