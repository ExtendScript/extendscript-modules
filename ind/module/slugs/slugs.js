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

        // Module code here...
        slugs.test = function() {
            return true;
        };
    };

    //--------------------------
    // End slugs class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
