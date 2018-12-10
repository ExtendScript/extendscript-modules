(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "___utilName___";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start ___utilName___ class

    function moduleClass() {
        var ___utilName___ = this;

        ___utilName___.version = VERSION;
        ___utilName___.description = "___description___";
        
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

        ___utilName___.test = function() {
            return true;
        };
    };

    //--------------------------
    // End ___utilName___ class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
