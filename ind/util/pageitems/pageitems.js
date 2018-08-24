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

            var PageUtil = Sky.getUtil("pages");

            var pageInfo = PageUtil.getInfo(SpreadPage);

            if

            infoPage.kind  = pageSpread.constructor.name;
            infoPage.units = units;
            var spread    = (infoPage.kind === "Page") ? pageSpread.parent : pageSpread;

            try {
                // Create rectangle on layer
                // var rect = myPage.rectangles.add(myLayer,{geometricBounds:myBounds, appliedObjectStyle: myPage.parent.parent.objectStyles.item(0), fillColor:myColour.fill, strokeColor:myColour.stroke});
            } catch( error ){
                return error;
            };
        };

        pageitems.addRect2Page = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Returns     : New Rectangle or Error
            // Description : Adds a new rectangle to the bounds of SpreadPage
            return pageitems.boundsToPage( SpreadPage, pageitems.addRect(SpreadPage, Options) );
        };
    
        pageitems.addRect2Bleed = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Returns     : New Rectangle or Error
            // Description : Adds a new rectangle to the bleed bounds of SpreadPage
            return pageitems.boundsToBleed( SpreadPage, pageitems.addRect(SpreadPage, Options) );
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
