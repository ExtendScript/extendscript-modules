(function () {
    var VERSION = 0.4;
    var MODULE_PATH = "menuloader";
    
    // This module is inspired by posts from Marc Autret (Indiscripts)
    // http://www.indiscripts.com/post/2010/02/how-to-create-your-own-indesign-menus
    // http://www.indiscripts.com/post/2011/12/indesign-scripting-forum-roundup-2

    // ---
    // Note:  menus/submenus are application-persistent

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

        menuloader.funWrapper = function( fun, menuName ) {
            // Wrap the given function in a try-catch statement and add single undo for user action.
            // So we don't halt the whole application on error and user can undo any manu action.
            return function () {
                try {
                    // prevent undo - CS5+
                    app.doScript(fun, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Expand State Abbreviations");
                } catch(e) {
                    alert(menuName + " generated an error:\n" + e.message +  " (Line " + e.line + " in file " + e.fileName + ")");
                };
            };
        };

        menuloader.getMenu = function( MenuTemplate ) {
            var location = app.menus.item( '$ID/Main' );
            for (var i = 0; i < MenuTemplate.path.length; i++) {
                location = location.submenus.item( MenuTemplate.path[i] );
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
            // Make sure old menu is removed before building a new one
            menuloader.unload( MenuTemplate, alertUser );

            // Enable ExtendScript localisation engine
            $.localize = true;
            var AT_END = LocationOptions.atEnd;
            var alertUser = (typeof alertUser === 'boolean')? alertUser : true;

            try{
                var MainMenu = app.menus.item( '$ID/Main' );

                var menuInstaller = menuInstaller || ( function() {
                    
                    var location = MainMenu;
                    for (var i = 0; i < MenuTemplate.path.length; i++) {
                        location = location.submenus.item( MenuTemplate.path[i] );
                    };

                    var refItem  = location.submenus.lastItem();
                    if( MenuTemplate.ref ) {
                        refItem  = location.menuItems.item( MenuTemplate.ref );
                    };

                    var loc = LocationOptions.after;
                    if( MenuTemplate.loc ) {
                        loc  = location.menuItems.item( MenuTemplate.loc );
                    };

                    if(location === MainMenu) {
                        location = location.submenus.add( MenuTemplate.menuName, LocationOptions.before, location.submenus.lastItem() );
                    };

                    // Load Menu
                    if(MenuTemplate.sub.length === 0) {

                        // There is no sub menu, load default action
                        var fun = menuloader.funWrapper( MenuTemplate.fun, MenuTemplate.menuName );
                        MenuTemplate.action = app.scriptMenuActions.add( MenuTemplate.menuName );
                        MenuTemplate.action.addEventListener('onInvoke', fun);
                        location.menuItems.add( MenuTemplate.action, loc, refItem );

                    } else { // Load with Sub Menu!
                        
                        location = location.submenus.add( MenuTemplate.menuName, loc, refItem );

                        // (Re)set the menu actions
                        // ---
                        var subItem, i = MenuTemplate.sub.length;
                        while( i-- ) {
                            subItem = MenuTemplate.sub[i];
                            if( subItem.separator ) continue;

                            if( typeof subItem.fun === 'function') {
                                // Create the corresponding action
                                // ---
                                var fun = menuloader.funWrapper( subItem.fun, MenuTemplate.menuName + " - " + subItem.caption );
                                subItem.action = app.scriptMenuActions.add( subItem.caption );
                                subItem.action.addEventListener('onInvoke', fun);
                            };
                        };

                        // Build Sub Menu
                        // ---
                        // Fill menu with respect to MenuTemplate order
                        // (Possible submenus are specified in .subName and created on the fly)
                        // ---
                        var s, n = MenuTemplate.sub.length, subs = {}, sub = null;
                        for( i=0 ; i < n ; ++i ) {
                            subItem = MenuTemplate.sub[i];

                            // Target the desired submenu
                            // ---
                            sub = (s=subItem.subName) ? ( subs[s] || (subs[s]=location.submenus.add( s, AT_END )) ) : location;

                            // Connect the related action OR create a separator
                            // ---
                            if( subItem.separator ) {
                                sub.menuSeparators.add( AT_END );
                            } else {
                                sub.menuItems.add( subItem.action, AT_END );
                            };
                        };
                        // End Build Sub Menu

                    }; // End Load Menu

                    return true;

                })(); // invoke!!
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
                for (var i = 0; i < MenuTemplate.path.length; i++) {
                    Submenu = Submenu.submenus.item( MenuTemplate.path[i] );
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

        menuloader.menuTemplate = function( menuName, Options ) {
            if (!(this instanceof menuloader.menuTemplate)) {
                throw new Error("menuTemplate should be created using new operator.");
            };

            var Menu = this;
            var Options = (typeof Options === 'object') ? Options : {};

            Menu.menuName = String( menuName );

            // Array, Empty === Main
            Menu.path = (Options.hasOwnProperty('path')) ? [].concat(Options.path) : [];
            Menu.sub  = (Options.hasOwnProperty('sub' )) ? [].concat(Options.sub)  : [];
            Menu.loc  = (Options.hasOwnProperty('loc' )) ? Options.loc  : undefined;
            Menu.ref  = (Options.hasOwnProperty('ref' )) ? Options.ref  : undefined;
            Menu.fun  = (Options.hasOwnProperty('fun' )) ? Options.fun  : undefined;

            // Menu Tools
            //- - - - - -
            Menu.addElement = function( elementTemplate ) {
                Menu.sub.push( elementTemplate );
            };

            // Element Templates
            //- - - - - - - - - -
            Menu.createItem = function( caption, fun, subName ) {
                // subName is optional
                var subName = (typeof subName === 'string')? subName : "";
                return { caption: String(caption), fun: fun,  subName: String(subName) };
            };

            Menu.createSeparator = function( subName ) {
                // subName is optional
                var subName = (typeof subName === 'string')? subName : "";
                return { separator: true, subName: subName };
            };
        };

    };

    //--------------------------
    // End menuloader class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
