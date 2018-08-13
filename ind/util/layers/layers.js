(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "layers";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // layers class

    function moduleClass() {
        var layers = this;

        layers.version = VERSION;
        layers.description = "Some layer utilities for InDesign";
        
        // Module code here...
        layers.test = function() {
            return true;
        };
    };

    //--------------------------
    // End rulers

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
