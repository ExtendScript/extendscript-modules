(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "outerspace";

    var thisModule = Sky.getModule(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start outerspace class

    function moduleClass() {
        var outerspace = this;

        outerspace.version = VERSION;
        outerspace.description = "Bleed and Slug tools for InDesign.";
        
        var LoadCallback = function ( err, module ){
            // Throws an error when dependency could not be loaded...
            if( err instanceof Error || err instanceof TypeError ) {
                throw new TypeError( err.message, $.fileName, $.line );
            };
            return module;
        };

        // Load any needed dependencies
        var Rulers = Sky.getUtil("rulers", LoadCallback );
        var Font   = Sky.getUtil("font",   LoadCallback );

        //- - - - - - - - - - - - - - - - - - - - - - 
        // Module code here...
        //- - - - - - - - - - - - - - - - - - - - - - 
        // Default font to use in outer space
        var _Settings = { registration_font: undefined };

        outerspace.getSetting = function() {
            return _Settings;
        };

        outerspace.setSettings = function( Settings ) {
            // A way for a user to load custom settings.
            // We need write this more fool proof
            _Settings = Settings;
        };

        outerspace.getRegistrationFontFamilyName = function ( ){
            return Font.createFontObject( _Settings.registration_font ).familyName;
        };

        outerspace.getRegistrationFontStyleName = function ( ) {
            return Font.createFontObject( _Settings.registration_font ).styleName;
        };

        outerspace.getMeasureParagraphStyle = function( Doc, options ) {
            var doc = options.doc || undefined;
            
            return true;
        };


        function getMeasureParagraphStyle( Doc, psName, newFontName) {
            // Param psName: Name of valid Paragraph Style to be returned
            // newFontName: The name of the font we want to set the paragraph style
            
            function setParagraphStyleFont( Doc, measureParagraphStyle, myNewFontName, saveAsStandard){
                // This function will try and set the font style for given paragraph style
                // User will be asked for alternate font if given font is not loaded

                var myNewFontObj = Font.createFontObject(myNewFontName);

                var saveAsStandard = (saveAsStandard || false);
                try{
                    measureParagraphStyle.appliedFont = myNewFontObj.fullName;
                } catch (e) {
                    try{
                        // Let the user pick a font
                        var userInput = Font.userChooseFont();
                        if(typeof userInput == 'object') {
                            var userFontObject = Font.createFontObject(userInput.fontName);
                            if(userFontObject.familyName != undefined) {
                                saveAsStandard = userInput.savePrefs;
                                try {
                                    measureParagraphStyle.appliedFont  = userFontObject.familyName;
                                    measureParagraphStyle.appliedStyle = userFontObject.styleName;
                                } catch ( anyErr ) {
                                    // Do nothing
                                } 
                                if(saveAsStandard){
                                    // we need to save this font in Settings, so this dialog will not come up next time
                                    outerspace.Settings.registration_font = userFontObject.fullName;
                                    outerspace.saveSettings();
                                }
                            }
                        }
                    } catch (e) {
                        alert("CoverBuilder Error:\n" + e.message +  " (Line " + e.line + " in file " + e.fileName + ")");
                        // This should never happen but if it does
                        // font will be missing in document
                    }
                }
            }

            // Use standard font if create a style from scratch
            // Don't change the font if the paragraph style already exist
            var myNewFontName = String(outerspace.Settings.registration_font);
            var changeFont = false;

            if( typeof newFontName == "string" ){
                if(newFontName != "undefined"){
                    // The returned paragraph style should use the requested font 
                    // If it is not available alternate will be requested from user
                    myNewFontName = newFontName;
                    changeFont = true;
                }
            }
            
            var measureParagraphStyle = Doc.paragraphStyles.item(psName);
            
            if( measureParagraphStyle.isValid ) {
                if(changeFont){
                    setParagraphStyleFont(Doc, measureParagraphStyle, myNewFontName, false);
                }
            } else {
                // Create the measure style
                var measureParagraphStyle = Doc.paragraphStyles.add({name:psName});
                
                setParagraphStyleFont( Doc, measureParagraphStyle, myNewFontName, true);

                measureParagraphStyle.pointSize = "8pt";
                measureParagraphStyle.fillColor = "Registration";
                measureParagraphStyle.fillTint = 100;
                measureParagraphStyle.justification = 1667591796;
            }
            
            
            // Always returns a valid paragraph style
            return measureParagraphStyle;
            
        };

        outerspace.getSlugs = function( Doc, Units ){
            // Returns array of measurements in `Units`
            // In a similar fashion as geometricBounds
            // [Left, Top, Right, Bottom]

            // Use ruler units when undefined
            // How to resolve conflict horizontal vertical?

            // Set and save document ruler units
            var originalState = Rulers.set( Doc, Units );
            
            var slugSizes = [ Doc.documentPreferences.slugBottomOffset,
                              Doc.documentPreferences.slugInsideOrLeftOffset,
                              Doc.documentPreferences.slugRightOrOutsideOffset,
                              Doc.documentPreferences.slugTopOffset];
            };

            Rulers.set( Doc, originalState );

            return maxSlug;
        };

        outerspace.getMaxSlug = function( Doc, Units ){
            //This function returns the maximum slug size in `Units`
            var slugSizes = outerspace.getSlugs( Doc, Units );
            return Math.max( slugSizes[0], slugSizes[1], slugSizes[2], slugSizes[3] );
        };

        outerspace.getMinSlug = function( Doc, Units ){
            //This function returns the maximum slug size in `Units`
            var slugSizes = outerspace.getSlugs( Doc, Units );
            return Math.min( slugSizes[0], slugSizes[1], slugSizes[2], slugSizes[3] );
        };

    };

    //--------------------------
    // End outerspace class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
