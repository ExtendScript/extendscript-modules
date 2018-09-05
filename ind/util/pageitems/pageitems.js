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

        // Load any needed modules
        pageitems.layer = Sky.getUtil("layer");

        // We need to test if requirements are loaded!

        pageitems.getParentPage = function ( PageItem ) {

            switch ( PageItem.constructor.name ) {
                case "Page":
                    return PageItem;
                    break;
                case "Document":
                case "Spread":
                case "MasterSpread":
                    return PageItem.pages.item(0);
                    break;
                case "Button":
                case "ComboBox":
                case "CheckBox":
                case "EPSText":
                case "FormField":
                case "Graphic":
                case "GraphicLine":
                case "Group":
                case "HtmlItem":
                case "ListBox":
                case "ListBox":
                case "MediaItem":
                case "Movie":
                case "MultiStateObject":
                case "Oval":
                case "PageItem": 
                case "Polygon":
                case "RadioButton":
                case "Rectangle":
                case "SignatureField":
                case "SignatureField":
                case "Sound":
                case "SplineItem":
                case "TextBox":
                case "TextFrame":
                    return PageItem.parentPage;
                    break;
                case "Character":
                case "Line":
                case "Paragraph":
                case "Text":
                case "TextColumn":
                case "TextStyleRange":
                case "Word":
                case "InsertionPoint":
                    return PageItem.parentTextFrames[0].parentPage;
                    break;
                case "Table":
                case "Cell":
                case "Column":
                case "Row":
                case "Footnote":
                    // recurse
                    return pageitems.getParentPage(PageItem.parent);
                    break;
                default:
                    return new Error("Could not get parent page from " + PageItem.constructor.name );
                    break;
            };
        };

        pageitems.getParentSpread = function( PageItem ) {
            var parentPage = pageitems.getParentPage( PageItem );
            if( parentPage.constructor.name === "Page" ) {
                return parentPage.parent;
            } else {
                return parentPage; // error
            };
        };

        pageitems.getParentDoc = function( PageItem ) {
            var parentSpread = pageitems.getParentSpread( PageItem );
            if( parentSpread.constructor.name === "Spread" ) {
                return parentSpread.parent;
            } else {
                return parentSpread; // error
            };
        };

        pageitems.addTextFrame = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : Options    : optional object with optional properties:
                // bounds         : desired bounds
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
            // Description : Adds a new TextFrame on SpreadPage
        };

        pageitems.addRect = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : Options    : Optional object with optional properties:
                // bounds         : desired bounds
                // layer          : stringName or layer reference
                // rotationAngle  : number
                // label          : string
                // fillColor      : stringName of swatch reference
                // strokeColor    : stringName of swatch reference
                // strokeWidth    : width of the stroke in points
                // objectStyle    : stringName or style reference
            // Returns     : New Rectangle or error
            // Description : Adds a new rectangle on SpreadPage at myBounds

            var pageKind = SpreadPage.constructor.name;
            var Spread   = (pageKind === "Page") ? SpreadPage.parent : SpreadPage;
            var Doc      = Spread.parent;

            // It would be cool if there was a function that
            // processes the Options object automatically as JSON schema.

            // Setting good standard values is important as users can have different presets.

            var initProps = {
                itemLayer          : (Options.layer)        ? Options.layer        : Doc.activeLayer,
                appliedObjectStyle : (Options.objectStyle)  ? Options.objectStyle  : Spread.parent.objectStyles.item(0)
            };

            // appliedObjectStyle is king. So we need to first apply appliedObjectStyle and then add any custom over-rides
            var overRideProps = {
                geometricBounds    : (Options.bounds)       ? Options.bounds       : [0,0,0.25,0.25],
                fillColor          : (Options.fillColor)    ? Options.fillColor    : "None",
                strokeColor        : (Options.strokeColor)  ? Options.strokeColor  : ( parseFloat(Options.strokeWeight) > 0)  ? "Black"  : "None",
                strokeWeight       : (Options.strokeWeight) ? Options.strokeWeight : 0
            };

            // It would be cool to have a width and height parameter as well as x and y instead of bounds?
            // So we can give the bounds OR width height with optional x, y?

            try {
                var rect = SpreadPage.rectangles.add( initProps );
                return pageitems.updateProps( rect, overRideProps );
            } catch( error ){
                return error;
            };
        };

        pageitems.updateProps = function( pageItems, updateProps ) {
            // This tool can quickly set a bunch of properties
            var pageArray = ( Array.isArray(pageItems) ) ? pageItems : [ pageItems ];

            for (var i = 0, len = pageArray.length; i < len; i++) {
                for(var propName in updateProps) {
                    pageArray[i][propName] = updateProps[propName];
                };
            };

            return pageItems;
        };

        pageitems.addRect2Page = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Returns     : New Rectangle or Error
            // Description : Adds a new rectangle to the bounds of SpreadPage
            return pageitems.boundsToRef( pageitems.addRect(SpreadPage, Options), SpreadPage );
        };
    
        pageitems.addRect2Bleed = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Returns     : New Rectangle or Error
            // Description : Adds a new rectangle to the bleed bounds of SpreadPage
            return pageitems.boundsToBleed( pageitems.addRect(SpreadPage, Options), SpreadPage );
        };
    
        pageitems.bounds2Ref = function( pageItems, Reference ){
            // Parameter   : pageItems  : A page item or array of pageItems
            // Parameter   : Reference  : Optional: Any ref that has a bounds property, parentPage if not defined
            // Returns     : Array of updated pageItems
            // Description : Sets bounding box of pageItems to ParentPage bounds

            var pageItems = ( Array.isArray(pageItems) ) ? pageItems : [ pageItems ];
            var Reference = ( Reference.hasOwnProperty('bounds') ) ? Reference : undefined;

            for (var i = 0, len = pageItems.length; i < len; i++) {
                if( Ref === undefined) {
                    Ref = PageUtil.getInfo( pageItems[i].parentPage );
                } else {
                    Ref = Reference;
                };
                pageItems[i].bounds = Ref.bounds;
            };
            return pageItems;
        };

        pageitems.bounds2Bleed = function( pageItems, SpreadPage ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : pageItems  : A page item or array of pageItems
            // Returns     : pageItems
            // Description : Updates bounding box of pageItems to SpreadPage bleed

            var PageUtil = Sky.getUtil("page");
            var pageItems = ( Array.isArray(pageItems) ) ? pageItems : [ pageItems ];

            for (var i = 0, len = pageItems.length; i < len; i++) {
                var pageRef  = ( typeof SpreadPage === undefined ) ? pageItems[i].parentPage : SpreadPage;
                var pageInfo = PageUtil.getInfo( pageRef );
                pageItems[i].bounds = pageInfo.bleedBounds;
            };
        };
    };

    //--------------------------
    // End pageitems class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
