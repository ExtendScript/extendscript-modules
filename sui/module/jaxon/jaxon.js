(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "jaxon";

    var thisModule = Sky.getModule(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start jaxon class

    function moduleClass() {
        var jaxon = this;

        jaxon.version = VERSION;
        jaxon.description = "ExtendScript Preset Manager";
        
        var LoadCallback = function ( err, module ){
            // Throws an error when dependency could not be loaded...
            if( err instanceof Error || err instanceof TypeError ) {
                throw new TypeError( err.message, $.fileName, $.line );
            };
            return module;
        };

        // Load any needed dependencies
        // var Module = Sky.getUtil( "module", LoadCallback );

        //- - - - - - - - - - - - - - - - - - - - - - 
        // Module code from here...
        //- - - - - - - - - - - - - - - - - - - - - - 

        jaxon.test = function() {
            return true;
        };
    };

    //--------------------------
    // End jaxon class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
