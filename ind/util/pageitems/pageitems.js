(function () {
    var VERSION = 0.1;
    var MODULE_PATH = "pageitems";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start pageitems class

    function moduleClass() {
        var pageitems = this;

        pageitems.version = VERSION;
        pageitems.description = "Utilities that create or target page items in InDesign.";
        
        // This might be useful as a separate module?
        function boundsClass() {
            var bounds = this;
            bounds.getBoundsRelative2Page = function( ){ };
            bounds.getBoundsRelative2Spread = function( ){ };
            bounds.getBoundsInfo = function( ){ };
            bounds.getBoundsOfset = function( ){ };
            bounds.zeroBounds = function( ){ };
        };

        pageitems.bounds = new boundsClass();

        pageitems.addTextFrame = function( SpreadPage, myBounds, options ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : myBounds   : The desired bounds of the new TextFrame
            // Parameter   : options    : object with TextFrame Settings:
                // layer          : stringName or layer reference
                // rotationAngle  : number
                // label          : string
                // fillColor      : stringName of swatch reference
                // strokeColor    : stringName of swatch reference
                // strokeWidth    : width of the stroke in points
                // objectStyle    : stringName or style reference
                // contents       : string
                // paragraphStyle : string or reference
            // Returns     : New TextFrame
            // Description : Adds a new TextFrame on SpreadPage at myBounds
        };

        pageitems.addRect = function( SpreadPage, myBounds, options ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : myBounds   : The desired bounds of the new Rectangle
            // Parameter   : options    : object with extra parameters:
                // layer          : stringName or layer reference
                // rotationAngle  : number
                // label          : string
                // fillColor      : stringName of swatch reference
                // strokeColor    : stringName of swatch reference
                // strokeWidth    : width of the stroke in points
                // objectStyle    : stringName or style reference
            // Returns     : New Rectangle or error
            // Description : Adds a new rectangle on SpreadPage at myBounds

            try {
                // Create rectangle on layer
                // var rect = myPage.rectangles.add(myLayer,{geometricBounds:myBounds, appliedObjectStyle: myPage.parent.parent.objectStyles.item(0), fillColor:myColour.fill, strokeColor:myColour.stroke});
            } catch( error ){
                return error;
            };
        };

        pageitems.addRect2Page = function( SpreadPage, options ){
            // Parameter   : SpreadPage : A spread or page
            // Returns     : New Rectangle or Error
            // Description : Adds a new rectangle to the bounds of SpreadPage
            return pageitems.boundsToPage( SpreadPage, pageitems.addRect(SpreadPage, options) );
        };
    
        pageitems.addRect2Bleed = function( SpreadPage, options ){
            // Parameter   : SpreadPage : A spread or page
            // Returns     : New Rectangle or Error
            // Description : Adds a new rectangle to the bleed bounds of SpreadPage
            return pageitems.boundsToBleed( SpreadPage, pageitems.addRect(SpreadPage, options) );
        };
    
        pageitems.boundsToPage = function( SpreadPage, pageItems ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : pageItems  : A page item or array of pageItems
            // Returns     : pageItems
            // Description : Updates bounding box of pageItems to SpreadPage bounds

            var pageItems = ( Array.isArray(pageItems) ) ? pageItems : [ pageItems ];

        };

        pageitems.boundsToBleed = function( SpreadPage, pageItems ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : pageItems  : A page item or array of pageItems
            // Returns     : pageItems
            // Description : Updates bounding box of pageItems to SpreadPage bleed

            var pageItems = ( Array.isArray(pageItems) ) ? pageItems : [ pageItems ];

        };

        pageitems.test = function() {
            return true;
        };
    };

    //--------------------------
    // End pageitems class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
