(function () {
    var VERSION = 0.3;
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

        var LoadCallback = function (err, module){
            // Throws an error when dependency could not be loaded...
            if( err instanceof Error || err instanceof TypeError ) {
                throw new TypeError( err.message, $.fileName, $.line);
            };
            return module;
        };

        // Load any needed modules
        var PageUtil = Sky.getUtil("pages", LoadCallback );

        pageitems.updateProps = function( pageItems, UpdateProps ) {
            // This tool can quickly set a bunch of properties
            var itemsArray = ( Array.isArray(pageItems) ) ? pageItems : [ pageItems ];
            if (typeof UpdateProps !== 'object') throw new Error("Update props expects an Object but received " + typeof UpdateProps);

            for (var i = 0, len = itemsArray.length; i < len; i++) {
                for(var propName in UpdateProps) {
                    itemsArray[i][propName] = UpdateProps[propName];
                };
            };

            return pageItems;
        };

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
                    if( PageItem.parentPage ) {
                        return PageItem.parentPage;  
                    } else if (PageItem.parent.constructor.name === "Spread" ) {
                        // As Marc Autret would do it (https://forums.adobe.com/thread/1880486)
                        var pIndex = 0;
                        var x = PageItem.resolve(AnchorPoint.centerAnchor,CoordinateSpaces.SPREAD_COORDINATES)[0][0];
                        var allPages = PageItem.parent.pages.everyItem().getElements();
                        for (var d = 1/0, i = 0; i < allPages.length; i++) { 
                            diff = Math.abs(x - allPages[i].resolve(AnchorPoint.centerAnchor,CoordinateSpaces.SPREAD_COORDINATES)[0][0]);  
                            if( diff < d ){ d=diff; pIndex=i; }
                        };
                        return PageItem.parent.pages[pIndex];
                    } else {
                       return new Error("Page item does not have a parent page or spread. Found " + PageItem.parent.constructor.name );
                    };
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
                // geometricBounds    : desired bounds
                // itemLayer          : stringName or layer reference
                // rotationAngle      : number
                // label              : string
                // fillColor          : stringName of swatch reference
                // strokeColor        : stringName of swatch reference
                // strokeWidth        : width of the stroke in points
                // appliedObjectStyle : stringName or style reference
                // contents           : string
                // paragraphStyle     : string or reference
                // autoSizingType     : string
            // Returns     : New TextFrame
            // Description : Adds a new TextFrame on SpreadPage

            var overRideProps = {};
            var Options  = (typeof Options === 'object') ? Options : {}; // optional
            var pageKind = SpreadPage.constructor.name;
            var Spread   = (pageKind === "Page") ? SpreadPage.parent : SpreadPage;
            var Doc      = Spread.parent;

            // Setting good standard values is important as users can have different presets        
            // We need to first apply appliedObjectStyle and then add any custom over-rides

            var initProps = {
                itemLayer          : (Options.itemLayer)          ? Options.itemLayer          : Doc.activeLayer,
                appliedObjectStyle : (Options.appliedObjectStyle) ? Options.appliedObjectStyle : Spread.parent.objectStyles.item(0),
                label              : (Options.label)              ? Options.label              : "",
                rotationAngle      : (Options.rotationAngle)      ? Options.rotationAngle      : 0
            };

            for(var k in Options) {
                if ( k != "appliedObjectStyle" && k != "appliedParagraphStyle" && k != "autoSizingType") overRideProps[k] = Options[k];
            };

            var tf = pageitems.updateProps( SpreadPage.textFrames.add( initProps ), overRideProps );
            // Apply paragraphStyle to contents
            if( Options.appliedParagraphStyle ) {
                tf.paragraphs.everyItem().appliedParagraphStyle = Options.appliedParagraphStyle;
            };

            if( Options.autoSizingType ) {
                switch( Options.autoSizingType ) {
                    case "HEIGHT_ONLY":
                         tf.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
                        break;
                    case "WIDTH_ONLY":
                        tf.textFramePreferences.autoSizingType = AutoSizingTypeEnum.WIDTH_ONLY;
                        break;
                    case "HEIGHT_AND_WIDTH":
                        tf.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_AND_WIDTH;
                        break;
                    case "HEIGHT_AND_WIDTH_PROPORTIONALLY":
                        tf.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_AND_WIDTH_PROPORTIONALLY;
                        break;
                    default:
                        break;
                };
            };

            return tf;
        };

        pageitems.addRect = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : Options    : Optional object with optional properties:
                // geometricBounds    : desired bounds
                // itemLayer          : stringName or layer reference
                // rotationAngle      : number
                // label              : string
                // fillColor          : stringName of swatch reference
                // strokeColor        : stringName of swatch reference
                // strokeWidth        : width of the stroke in points
                // appliedObjectStyle : stringName or style reference
            // Returns     : New Rectangle or error
            // Description : Adds a new rectangle on SpreadPage at myBounds

            var overRideProps = {};
            var Options  = (typeof Options === 'object') ? Options : {}; // optional
            var pageKind = SpreadPage.constructor.name;
            var Spread   = (pageKind === "Page") ? SpreadPage.parent : SpreadPage;
            var Doc      = Spread.parent;

            // Setting good standard values is important as users can have different presets        
            // We need to first apply appliedObjectStyle and then add any custom over-rides
    
            var initProps = {
                itemLayer          : (Options.hasOwnProperty("itemLayer")          ) ? Options.itemLayer          : Doc.activeLayer,
                appliedObjectStyle : (Options.hasOwnProperty("appliedObjectStyle") ) ? Options.appliedObjectStyle : Spread.parent.objectStyles.item(0)
            };

            for(var k in Options) {
                if ( k != "appliedObjectStyle") overRideProps[k] = Options[k];
            };

            // It would be cool add a custom width and height parameter as well as x and y instead of bounds?
            // So we can give the bounds OR width height with optional x, y? x, y and width height would over-ride bounds.

            try {
                var rect = SpreadPage.rectangles.add( initProps );
                return pageitems.updateProps( rect, overRideProps );
            } catch( error ){
                return error;
            };
        };

        pageitems.addRectToPage = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Returns     : New Rectangle or Error
            // Description : Adds a new rectangle to the bounds of SpreadPage
            return pageitems.boundsToRef( pageitems.addRect(SpreadPage, Options), SpreadPage );
        };
    
        pageitems.addRectToBleed = function( SpreadPage, Options ){
            // Parameter   : SpreadPage : A spread or page
            // Returns     : New Rectangle or Error
            // Description : Adds a new rectangle to the bleed bounds of SpreadPage
            return pageitems.boundsToBleed( pageitems.addRect(SpreadPage, Options), SpreadPage );
        };

        pageitems.boundsToRef = function( pageItems, Reference ){
            // Parameter   : pageItems  : A page item or array of pageItems
            // Parameter   : Reference  : Optional: Any ref that has the geometricBounds property, parentPage if not defined
            // Returns     : Array of updated pageItems
            // Description : Sets bounding box of pageItems to ParentPage bounds

            var _pageItems = ( Array.isArray(pageItems) ) ? pageItems : [ pageItems ];
            var Reference = ( Reference.hasOwnProperty('geometricBounds') ) ? Reference : undefined;

            for (var i = 0, len = _pageItems.length; i < len; i++) {
                if( Reference === undefined) {
                    var refBounds = PageUtil.getInfo( _pageItems[i].parentPage ).bounds;
                } else {
                    var refBounds = Reference.geometricBounds;
                };
                _pageItems[i].geometricBounds = refBounds;
            };
            return pageItems;
        };

        pageitems.boundsToBleed = function( pageItems, SpreadPage ){
            // Parameter   : SpreadPage : A spread or page
            // Parameter   : pageItems  : A page item or array of pageItems
            // Returns     : pageItems
            // Description : Updates bounding box of pageItems to SpreadPage bleed

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
