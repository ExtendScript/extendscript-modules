(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "menuloader";
    
    // This module is inspired by a post from Marc Autret (Indiscripts)
    // http://www.indiscripts.com/post/2010/02/how-to-create-your-own-indesign-menus

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start menuloader class

    function moduleClass() {
        var menuloader = this;

        menuloader.version = VERSION;
        menuloader.description = "Load your own menus in InDesign.";
        
        menuloader.load = function( menuSetup ) {
            // Enable ExtendScript localisation engine
            $.localize = true;

            try{
                var MainMenu = app.menus.item( '$ID/Main' );
                var menuHandlers = {
                    'onInvoke' : function() {
                        app.doScript(menuSetup.invokeFunction, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Expand State Abbreviations");
                    }};

                var menuInstaller = menuInstaller || ( function( MenuActionHandlers ) {

                    var MenuAction = app.scriptMenuActions.add( menuSetup.menuName );

                    var eventListener;
        
                    for( eventListener in MenuActionHandlers ) {
                        MenuAction.eventListeners.add( eventListener, MenuActionHandlers[eventListener] );
                    }
        
                    var location = MainMenu;            
                    for (var i = 0; i < menuSetup.locationPath.length; i++) {
                        location = location.submenus.item( menuSetup.locationPath[i] );
                    };

                    var refItem  = location.menuItems.item( menuSetup.reference );
        
                    location.menuItems.add( MenuAction, menuSetup.beforeAfter, refItem );

                    return true;

                })(menuHandlers);
            } catch ( err ) {
                alert("Can't load menu " + String(menuSetup.menuName) + "\n" + err.message + " (Line " + err.line + " in file " + err.fileName + ")");
            };
        };
        
        menuloader.newSetup = function( ){
            return {
                locationPath: [],
                beforeAfter:  undefined,
                reference: undefined,
                menuName: undefined,
                invokeFunction: undefined
            };
        };
    };

    //--------------------------
    // End menuloader class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
