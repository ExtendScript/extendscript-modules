(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "___moduleName___";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start ___moduleName___ class

    function moduleClass() {
        var ___moduleName___ = this;

        ___moduleName___.version = VERSION;
        ___moduleName___.description = "___description___";
        
        // Module code here...
        ___moduleName___.test = function() {
            return true;
        };
    };

    //--------------------------
    // End ___moduleName___ class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
