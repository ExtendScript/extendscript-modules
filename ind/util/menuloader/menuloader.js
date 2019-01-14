(function () {
    var VERSION = 1.1;
    var MODULE_PATH = "menuloader";
    
    // This module is inspired by a post from Marc Autret (Indiscripts)
    // http://www.indiscripts.com/post/2010/02/how-to-create-your-own-indesign-menus

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      //return;
    };

    //--------------------------
    // Start menuloader class

    function moduleClass() {
        var menuloader = this;

        menuloader.version = VERSION;
        menuloader.description = "Load an InDesign menu item.";

        menuloader.getMenuItem = function( menuName ) {
            var MainMenu = app.menus.item( '$ID/Main' );
            if(!MainMenu.isValid){
                return new Error( "InDesign main menu $ID/Main does not resolve into object.");
            };
            return MainMenu.submenus.itemByName( menuName );
        };

        menuloader.unload = function( submenu ) {
            if(!submenu.isValid){
                return new Error( "submenu " + submenu.name + " does not resolve to object." );
            };

            if(submenu.hasOwnProperty('submenus')) {
                // Clean sub menus recursively
                var subCount = submenu.submenus.count();
                for (var i = subCount - 1; i >= 0; i--) {
                    var subSubMenu  = submenu.submenus[i];
                    var subSubCount = subSubMenu.submenus.count();
                    if(subSubCount > 0) {
                        menuloader.unload( subSubMenu );
                    };
                };
            };

            if(submenu.hasOwnProperty('menuElements')) {
                // Then the rest of the menu elements
                var elementCount = submenu.menuElements.count();
                for (var j = elementCount - 1; j >= 0; j--) {
                    try {
                        app.scriptMenuActions.item(submenu.menuElements[j].name).remove();
                    } catch(e) {  };
                    try {
                        submenu.menuElements[j].remove();
                    } catch(e) { };
                };
            };

            try {
                submenu.submenus.everyItem().remove();
            } catch(e) { };
            try {
                submenu.menuSeparators.everyItem().remove();
            } catch(e) { };
            try {
                submenu.menuElements.everyItem().remove();
            } catch(e) { };
            try {
                submenu.menuItems.everyItem().remove();
            } catch(e) { };
            try {
                submenu.eventListeners.everyItem().remove();
            } catch(e) { };
            try {
                submenu.events.everyItem().remove();
            } catch(e) { };
            try {
                submenu.everyItem().remove();
            } catch(e) { };
            try {
                submenu.remove();
            } catch(e) { };
        };

        menuloader.loadSetup = function( MenuSetup ) {
            // Enable ExtendScript localisation engine
            $.localize = true;

            try{
                var MainMenu = app.menus.item( '$ID/Main' );
                var MenuHandlers = {
                    'onInvoke' : function() {
                        app.doScript(MenuSetup.invokeFunction, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Expand State Abbreviations");
                    }
                };

                var menuInstaller = menuInstaller || ( function( MenuHandlers ) {
                    
                    var MenuAction = app.scriptMenuActions.itemByName( MenuSetup.menuName );
                    MenuAction = MenuAction.isValid ? MenuAction : app.scriptMenuActions.add( MenuSetup.menuName );

                    for( var event in MenuHandlers ) {
                        MenuAction.eventListeners.add( event, MenuHandlers[event] );
                    };
        
                    var location = MainMenu;
                    for (var i = 0; i < MenuSetup.locationPath.length; i++) {
                        location = location.submenus.item( MenuSetup.locationPath[i] );
                    };

                    var refItem  = location.submenus.lastItem();
                    if( MenuSetup.reference ) {
                        refItem  = location.menuItems.item( MenuSetup.reference );
                    };

                    var beforeAfter = LocationOptions.after;
                    if( MenuSetup.beforeAfter ) {
                        beforeAfter  = location.menuItems.item( MenuSetup.beforeAfter );
                    };

                    if(location === MainMenu) {
                        return location.submenus.add( MenuSetup.menuName, beforeAfter, refItem );
                    } else {
                        return location.menuItems.add( MenuAction, beforeAfter, refItem );
                    };

                })( MenuHandlers );
            } catch ( err ) {
                alert("Unable to load menu " + "\n" + err.message + " (Line " + err.line + " in file " + err.fileName + ")")
                return err;
            };
        };

        menuloader.unloadSetup = function( MenuSetup ) {
            // Enable ExtendScript localisation engine
            $.localize = true;

            try{
                var MainMenu = app.menus.item( '$ID/Main' );
                if(!MainMenu.isValid){
                    return new Error("InDesign main menu $ID/Main does not resolve into object.");
                };

                var Submenu = MainMenu;
                for (var i = 0; i < MenuSetup.locationPath.length; i++) {
                    Submenu = Submenu.submenus.item( MenuSetup.locationPath[i] );
                };

                Submenu = Submenu.menuItems.itemByName( MenuSetup.menuName );

                if(Submenu.isValid){
                    menuloader.unload(Submenu);
                };
            } catch ( err ) {
                alert("Unable to unload menu " + String(MenuSetup.menuName) + "\n" + err.message + " (Line " + err.line + " in file " + err.fileName + ")");
                return err;
            };
        };

        menuloader.newSetup = function(){
            return {
                locationPath: [],
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
