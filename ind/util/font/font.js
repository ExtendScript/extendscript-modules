(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "font";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start font class

    function moduleClass() {
        var font = this;

        font.version = VERSION;
        font.description = "Some tools for interacting with fonts.";
        
        var LoadCallback = function ( err, module ){
            // Throws an error when dependency could not be loaded...
            if( err instanceof Error || err instanceof TypeError ) {
                throw new TypeError( err.message, $.fileName, $.line );
            };
            return module;
        };

        font.getUnicode = function( stringText ) {
            var unicodeArray = new Array();
            // For every char in string save Unicode 
            return unicodeArray;
        };

        font.createFontObject = function( myFontName ) {
            var fontObj = { fullName: String(myFontName), familyName: "", styleName: "" };
            var splitFont = String(myFontName).split('\t');
            if(splitFont.length == 2) {
                fontObj.familyName = splitFont[0];
                fontObj.styleName  = splitFont[1];
            } else { // CoverBuilder pre 3.0.5 did not save family name
                fontObj.familyName = String(myFontName);
                fontObj.styleName  = "";
            }
            return fontObj;
        };

        font.getRegistrationFontFamilyName = function ( myApp ){
            return createFontObject( myApp.Settings.registration_font ).familyName;
        };

        font.getRegistrationFontStyleName = function ( myApp ) {
            return createFontObject( myApp.Settings.registration_font ).styleName;
        };
        
        font.isSysFont = function ( myFontName ) {
            var fObj = createFontObject( String(myFontName) );
            var sysFonts = app.fonts.everyItem();
            for (var i=0; i<sysFonts.name.length; i++) {
                var fName = sysFonts.name[i].substr(0, sysFonts.name[i].indexOf("\t"));
                if(fName == fObj.familyName) {
                    return true;
                }
            }
            return false;
        };

        font.getAvailableFontStyles = function( familyName ) {
            //search inside array
            Array.prototype.findIn = function(search){
              var r = Array();
              for (var i=0; i<this.length; i++) {
                var fName = this[i].substr(0, this[i].indexOf("\t"));
                if(fName == search) {
                    r.push(this[i].substr(this[i].indexOf("\t") + 1, this[i].length));
                }
              }
              return r;
            };
            var sysFonts = app.fonts.everyItem();
            var availableStyles = sysFonts.name.findIn( familyName );
            return availableStyles;
        };
    };

    //--------------------------
    // End font class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
