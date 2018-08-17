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
        // Yes, the pages module will need this too...
        function boundsClass() {
            var bounds = this;
            
            bounds.getBoundsRelative2Page = function( ){ };
            
            bounds.getBoundsRelative2Spread = function( ){ };
            
            bounds.getInfo = function( bounds ){
                // This functions receives bounds (y1, x1, y2, x2)
                // and returns an object with bounds and info as below
                var topLeftY   = bounds[0];
                var topLeftX   = bounds[1];
                var botRightY  = bounds[2];
                var botRightX  = bounds[3];
                var height     = Math.abs(botRightY - topLeftY);
                var width      = Math.abs(botRightX - topLeftX);
                var halfWidth  = 0;
                var halfHeight = 0;

                if(width > 0) {
                    halfWidth = width/2;
                };
                if(height > 0) {
                    halfHeight = height/2;
                };

                return { bounds    : bounds,
                         height    : height,
                         width     : width,
                         topLeft   : {x: topLeftX                , y: topLeftY               } ,
                         topCenter : {x: topLeftX + halfWidth    , y: topLeftY               } ,
                         topRight  : {x: botRightX               , y: topLeftY               } ,
                         midLeft   : {x: topLeftX                , y: topLeftY  + halfHeight } ,
                         midCenter : {x: topLeftX + halfWidth    , y: topLeftY  + halfHeight } ,
                         midRight  : {x: botRightX               , y: topLeftY  + halfHeight } ,
                         botLeft   : {x: topLeftX                , y: botRightY              } ,
                         botCenter : {x: topLeftX + halfWidth    , y: botRightY              } ,
                         botRight  : {x: botRightX               , y: botRightY              } };
            };

            bounds.getOfset = function( itemBounds, relativeToBounds ){
                // BEWARE: This function expects both bounds to be in the same
                //  X-Y coordinate space, and use the same measure unit!
                //
                //   X--------X--------X
                //   |  |   |   |      |
                //   |--X---X---X------|
                //   |  |   |   |      |
                //   |--X---X---X------|
                //   X  |   |   |      X
                //   |--X---X---X------|
                //   |  |   |   |      |
                //   |  |   |   |      |
                //   |  |   |   |      |
                //   X--------X--------X
                //
                // Fetch Bounds Info
                var relBounds  = bounds.getInfo(relativeToBounds);
                var itemBounds = bounds.getInfo(itemBounds);

                return { bounds    : itemBounds.bounds,
                         height    : itemBounds.height,
                         width     : itemBounds.width,
                         topLeft   : { x: itemBounds.topLeft.x   - relBounds.topLeft.x    , y: itemBounds.topLeft.y   - relBounds.topLeft.y    } ,
                         topCenter : { x: itemBounds.topCenter.x - relBounds.topCenter.x  , y: itemBounds.topCenter.y - relBounds.topCenter.y  } ,
                         topRight  : { x: itemBounds.topRight.x  - relBounds.topRight.x   , y: itemBounds.topRight.y  - relBounds.topRight.y   } ,
                         midLeft   : { x: itemBounds.midLeft.x   - relBounds.midLeft.x    , y: itemBounds.midLeft.y   - relBounds.midLeft.y    } ,
                         midCenter : { x: itemBounds.midCenter.x - relBounds.midCenter.x  , y: itemBounds.midCenter.y - relBounds.midCenter.y  } ,
                         midRight  : { x: itemBounds.midRight.x  - relBounds.midRight.x   , y: itemBounds.midRight.y  - relBounds.midRight.y   } ,
                         botLeft   : { x: itemBounds.botLeft.x   - relBounds.botLeft.x    , y: itemBounds.botLeft.y   - relBounds.botLeft.y    } ,
                         botCenter : { x: itemBounds.botCenter.x - relBounds.botCenter.x  , y: itemBounds.botCenter.y - relBounds.botCenter.y  } ,
                         botRight  : { x: itemBounds.botRight.x  - relBounds.botRight.x   , y: itemBounds.botRight.y  - relBounds.botRight.y   } };
            };

            bounds.normalise = function( boundsArr ){
                // Zero bounds
                return [0, 0, boundsArr[2]-boundsArr[0], boundsArr[3]-boundsArr[1]];
            };
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

            for (var i = 0, len = pageItems.length; i < len; i++) {
                var pageBounds = Sky.getUtil('page').getInfo( pageItems[i].parentPage ).bounds;
                pageItems[i].bounds = pageBounds;
            };

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
