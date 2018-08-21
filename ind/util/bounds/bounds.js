(function () {
    var VERSION = 1.1;
    var MODULE_PATH = "bounds";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
        return;
    };

    //--------------------------
    // Start bounds class

    function moduleClass() {
        var bounds = this;

        bounds.version = VERSION;
        bounds.description = "Some utils for transforming InDesign bounds arrays.";
        
        bounds.getInfo = function( boundsArr ){
            // This functions receives boundsArr (y1, x1, y2, x2)
            // and returns an object with boundsArr and info as below
            var topLeftY   = boundsArr[0];
            var topLeftX   = boundsArr[1];
            var botRightY  = boundsArr[2];
            var botRightX  = boundsArr[3];
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

            return { bounds    : boundsArr,
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

        bounds.getRelativeOfset = function( boundsArr, relativeToBounds ){
            // BEWARE: This function expects both bounds to be in the same
            //  X-Y coordinate space, and use the same measure unit!
            //
            //   X--------X--------X
            //   |  |   |   |      |
            //   |--X---X---X------|
            //   |  |   |   |      |
            //   |--X---X---X------|
            //   X  |   | x |      X
            //   |--X---X---X------|
            //   |  |   |   |      |
            //   |  |   |   |      |
            //   |  |   |   |      |
            //   X--------X--------X
            //
            // Bounds Info
            var relBounds  = bounds.getInfo(relativeToBounds);
            var itemBounds = bounds.getInfo(boundsArr);

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

        bounds.offset = function( boundsArr, offset ) {
            // Param boundsArr: Array in format [y1, x1, y2, x2]
            // Param offset: Array or Number (Optional) x_y or [x, y]
            if (offset === undefined) offset = [0,0];
            if (typeof offset === "number") offset = [offset,offset];
            var updatedBounds = [0,0,0,0];
            updatedBounds[0] = boundsArr[0] + offset[1];
            updatedBounds[1] = boundsArr[1] + offset[0];
            updatedBounds[2] = boundsArr[2] + offset[1];
            updatedBounds[3] = boundsArr[3] + offset[0];
            return updatedBounds;
        };

        bounds.normalise = function( boundsArr, offset ) {
            // Param boundsArr: Array in format [y1, x1, y2, x2]
            // Param offset: Array or Number (Optional) x_y or [x, y]
            var normalBounds = [0, 0, boundsArr[2]-boundsArr[0], boundsArr[3]-boundsArr[1]];
            return bounds.offset( normalBounds, offset);
        };
    };

    //--------------------------
    // End bounds class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
