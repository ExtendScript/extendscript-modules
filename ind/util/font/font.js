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
            } else { // CoverBuilder pre 3.0.5 did not save style name
                fontObj.familyName = String(myFontName);
                fontObj.styleName  = "";
            }
            return fontObj;
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

        font.getAvailableFamilies = function(){
            // This funtion is written by Marijan Tompa (thank you tomaxxi)
            // https://indisnip.wordpress.com/2010/08/04/get-font-styles-from-font-family/
            Array.prototype.unique = function (){
                var r = new Array();
                o:for(var i = 0, n = this.length; i < n; i++){
                    for(var x = 0, y = r.length; x < y; x++){
                        if(r[x]==this[i]) continue o;}
                    r[r.length] = this[i];}
                return r;
            }
            // return app.fonts.everyItem().name;
            return app.fonts.everyItem().fontFamily.unique();
        };
        
        font.getAvailableStyles = function( familyName ) {
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

        font.userChoosesFontUI = function ( options ){
            var returnObj = { fontName : undefined, savePrefs : false };

            var myFamilyList = font.getAvailableFamilies();
                myFamilyList.unshift("- Select Font Family -");
        
            var myStyleList = ["- Select Font Style -"];

            var myWin = new Window('dialog', 'My Fonts');
                myWin.orientation = 'column';
            with( myWin ){
                myWin.sText = add('statictext', undefined, 'Select Font for Slug:');
                myWin.myFamilyNameDrop = add('dropdownlist', [0,0,180,30], undefined, {items:myFamilyList});
                myWin.myFamilyNameDrop.selection = 0;
                
                myWin.myStyleNameDrop = add('dropdownlist', [0,0,180,30], undefined, {items:myStyleList});
                myWin.myStyleNameDrop.selection = 0;
                
                myWin.myFamilyNameDrop.onChange = function() {
                  myWin.myStyleNameDrop.removeAll();
                  var sysFontAvailableStyles = font.getAvailableStyles(myWin.myFamilyNameDrop.selection.text);
                  for ( var i = 0; i < sysFontAvailableStyles.length; i++ ) {
                      myWin.myStyleNameDrop.add('item',sysFontAvailableStyles[i]);
                  }
                  myWin.myStyleNameDrop.selection = 0;
                }
                myWin.savePrefs = add("checkbox", undefined, "Update my preferences");
                myWin.savePrefs.value = false;
                myWin.btnOK = add('button', undefined, 'OK');
            }
            
            myWin.center();

            if(myWin.show() == true){
                if(myWin.myFamilyNameDrop.selection.index != 0) {
                    returnObj.fontName   = myWin.myFamilyNameDrop.selection.text + '\t' + myWin.myStyleNameDrop.selection.text;
                    returnObj.savePrefs  = myWin.savePrefs.value;
                }
            }

            return returnObj;
        };

    };

    //--------------------------
    // End font class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
