(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "groupList";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start groupList class

    function moduleClass() {
        var groupList = this;

        groupList.version = VERSION;
        groupList.description = "Attaches a scrollable panel/group list to a SUI Window.";
        
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

        groupList.attach = function( SuiLocation, pgCreator, Opions ) {
            // PARAM SuiLocation  : ScripUI Group, Panel or Window : 
            // PARAM pgCreator    : Function : Creates a new panel or group (List Item for the panelGroupList)
            // PARAM Options      : Object   : Option that update Settings.
            // RETURNS            : A new ScriptUI Group (Child of param SuiLocation)

            // This class returns a panel list with add/remove ([+][-]) buttons before or after each list item.
            // It generates a scrollbar scrollCount is exceeded.
            /*

                +------------------------------+
                | +----------------------+ +-+ |
                | | [+][-] [ pgCreator ] | |^| |
                | +----------------------+ |x| |
                | +----------------------+ | | |
                | | [+][-] [ pgCreator ] | | | |
                | +----------------------+ | | |
                | +----------------------+ | | |
                | | [+][-] [ pgCreator ] | |v| |
                | +----------------------+ +-+ |
                +------------------------------+

            */

            var pList = this;
            var Settings = new Object();

            // Set standards
            //--
            // Toggle visibility of the scrollbar.
            Settings.useScroll = (typeof Options.useScroll == 'boolean')? Options.useScroll : false;
            // The item count when the scrollbar kicks in (when useScroll is set to true)
            Settings.maxItems = (typeof Options.useScroll == 'integer')? Options.useScroll : 1; // Minimum value is 1
            // Scroll speed, how many panels move on each click
            Settings.scrollCount = 3; // Minimum value is 1, maximum value is maxItems
            // [+][-] buttons left or right?
            Settings.buttonsLeft = (typeof Options.buttonsLeft == 'boolean')? Options.buttonsLeft : false;

            // RETURN GroupList.attach
            // --
            return false;
        };
    };

    //--------------------------
    // End groupList class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
