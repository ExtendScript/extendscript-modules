(function () {
    var VERSION = 0.3;
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
        menuloader.description = "Load an InDesign menu item.";

        menuloader.getMenu = function( MenuTemplate ) {
            var location = app.menus.item( '$ID/Main' );
            for (var i = 0; i < MenuTemplate.locationPath.length; i++) {
                location = location.submenus.item( MenuTemplate.locationPath[i] );
            };

            if(!location.isValid){
                return new Error( "InDesign main menu $ID/Main does not resolve into object.");
            };

            return location.menuElements.itemByName( MenuTemplate.menuName );
        };

        menuloader.unloadElement = function( Element ) {
            if(!Element.isValid){
                return new Error( "Element does not resolve to object." );
            };

            try {
                if(Element.hasOwnProperty('menuElements')) {
                    // Clean subitems recursively
                    var subCount = Element.menuElements.count();
                    for (var i = subCount - 1; i >= 0; i--) {
                        var subElement = Element.menuElements[i];
                        if( subElement.menuElements.count() > 0 ) {
                            menuloader.unloadElement( subElement );
                        };
                    };
                };
            } catch(e) { };

            Element.remove();
        };

        menuloader.load = function( MenuTemplate, alertUser ) {
            // Enable ExtendScript localisation engine
            $.localize = true;
            var alertUser = (typeof alertUser === 'boolean')? alertUser : true;

            try{
                var MainMenu = app.menus.item( '$ID/Main' );

                var MenuHandlers = {
                    'onInvoke' : function() {
                        try {
                            // prevent undo - CS5+
                            app.doScript(MenuTemplate.invokeFunction, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Expand State Abbreviations");
                        } catch(e){
                            alert("ExtendScript Menu Error:\n" + e.message +  " (Line " + e.line + " in file " + e.fileName + ")"); // Let us know what is going on.
                        }
                    }
                };

                var menuInstaller = menuInstaller || ( function( MenuHandlers ) {
                    
                    var MenuAction = app.scriptMenuActions.add( MenuTemplate.menuName );
                    for( var eventHandler in MenuHandlers ) {
                        MenuAction.eventListeners.add( eventHandler, MenuHandlers[eventHandler] );
                    };
        
                    var location = MainMenu;
                    for (var i = 0; i < MenuTemplate.locationPath.length; i++) {
                        location = location.submenus.item( MenuTemplate.locationPath[i] );
                    };

                    var refItem  = location.submenus.lastItem();
                    if( MenuTemplate.reference ) {
                        refItem  = location.menuItems.item( MenuTemplate.reference );
                    };

                    var beforeAfter = LocationOptions.after;
                    if( MenuTemplate.beforeAfter ) {
                        beforeAfter  = location.menuItems.item( MenuTemplate.beforeAfter );
                    };

                    if(location === MainMenu) {
                        location = location.submenus.add( MenuTemplate.menuName, LocationOptions.before, location.submenus.lastItem() );
                    };

                    location.menuItems.add( MenuAction, beforeAfter, refItem );

                    return true;

                })( MenuHandlers );
            } catch ( err ) {
                if(alertUser) alert("Unable to load menu " + "\n" + err.message + " (Line " + err.line + " in file " + err.fileName + ")")
                return err;
            };
        };

        menuloader.unload = function( MenuTemplate, alertUser ) {
            // Enable ExtendScript localisation engine
            $.localize = true;
            var alertUser = (typeof alertUser === 'boolean')? alertUser : true;
            
            var MainMenu = app.menus.item( '$ID/Main' );
            if(!MainMenu.isValid){
                return new Error("InDesign main menu $ID/Main does not resolve into object.");
            };

            var Submenu = MainMenu;
            try{
                for (var i = 0; i < MenuTemplate.locationPath.length; i++) {
                    Submenu = Submenu.submenus.item( MenuTemplate.locationPath[i] );
                };
            } catch ( err ) {
                if(alertUser) alert("Unable to unload menu " + String(MenuTemplate.menuName) + "\n" + err.message + " (Line " + err.line + " in file " + err.fileName + ")");
                return err;
            };

            if(Submenu.isValid) {
                menuloader.unloadElement(
                    Submenu.menuElements.itemByName(MenuTemplate.menuName)
                );
            } else {
                if(alertUser) alert("Unable to unload menu " + String(MenuTemplate.menuName) + "\n" + err.message + " (Line " + err.line + " in file " + err.fileName + ")");
                return new Error("Menu location does not seem to resolve to a valid menu option.");
            };
        };

        menuloader.getMenuTemplate = function(){
            return {
                locationPath: [], // Empty === Main
                beforeAfter:  undefined,
                reference: undefined,
                menuName: undefined,
                invokeFunction: undefined,
                menuSub: []
            };
        };
    };

    //--------------------------
    // End menuloader class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
