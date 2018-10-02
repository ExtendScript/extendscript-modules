(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "styles";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start styles class

    function moduleClass() {
        var styles = this;

        styles.version = VERSION;
        styles.description = "Tools to create and adjust character, paragraph and object styles in InDesign.";
        
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

        styles.test = function() {
            return true;
        };
    };

    //--------------------------
    // End styles class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
