(function () {
    var VERSION = 1.0;
    var MODULE_PATH = "layer";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start layer class

    function moduleClass() {
        var layerModule = this;

        layerModule.version = VERSION;
        layerModule.description = "Some layer utilities for InDesign";


        layerModule.getByName = function( Doc, layerName, createBool ) {
            // Returns requested layer reference || undefined,
            // if createBool == true; returns new layer with layerName

            // Parse input
            if (!Doc.isValid) return new Error("Not a valid document...");
            var createBool = createBool === true;
            var layerName = String(layerName);

            for (var i=0; i < Doc.layers.length; i++) {
                if (Doc.layers[i].name == layerName) return Doc.layers[i];
            };

            if( createBool ) {
                return Doc.layers.add({name:layerName});
            } else {
                return undefined;
            };
        };

        layerModule.get = function( Doc, layerRefOrName, createBool ) {
            // Returns requested layer reference || undefined,
            // if createBool == true; returns new layer with layerName
            var createBool = createBool === true;

            if (typeof layerRefOrName === 'string' || layerRefOrName instanceof String ) {
                // type of string
                return layerModule.getByName( Doc, layerRefOrName, createBool );
            } else {
                if( layerRefOrName && layerRefOrName.constructor.name === "Layer" ) {
                    // type of layer-ref
                    if( layerRefOrName.isValid ) return layerRefOrName;
                    return layerModule.getByName( Doc, layerRefOrName.name, createBool );
                } else {
                    // Not a layer
                    return undefined;
                };
            };
        };

        layerModule.select = function( Doc, layerRefOrName, createBool ) {
            // returns LayerRef or Error
            var createBool = createBool === true;
            var LayerRef = layerModule.get( Doc, layerRefOrName, createBool );
            try {
                Doc.activeLayer = LayerRef;
                return LayerRef;
            } catch ( error ) {
                return error;
            };
        };

        layerModule.move = function( Doc, layerRefOrName, afterLayerNo, createBool ) {
            // returns LayerRef or Error
            var createBool = createBool === true;
            var LayerRef = layerModule.get( Doc, layerRefOrName, createBool );

            if( LayerRef === undefined ) {
                return new Error("Could not resolve layer reference.");
            };

            try {
                LayerRef.move( LocationOptions.AFTER, Doc.layers[afterLayerNo] );
                return LayerRef;
            } catch ( error ) {
                return error;
            };
        };

        layerModule.moveAndSelect = function( Doc, layerRefOrName, afterLayerNo, createBool ) {
            var createBool = createBool === true;
            var LayerRef = layerModule.select(Doc, layerRefOrName, createBool);
            if( LayerRef.isValid ) {
                return layerModule.move( Doc, LayerRef, afterLayerNo);
            } else {
                if (LayerRef instanceof Error) {
                    return LayerRef;
                } else {
                    return new Error("Could not resolve layer reference.");
                };
            };
        };

        layerModule.locker = function( LayerRef, lockBool ) {
            // lockBool: True:  layer will be locked
            // lockBool: False: layer will be unlocked
            // lockBool: Not true nor false: Layer lock will be toggled
            
            // Returns: The previous lock state
            var prevLockState = LayerRef.locked;

            if(typeof lockBool !== 'boolean'){
                // Toggle!
                var lockBool = !prevLockState;
            };

            if(lockBool){
                LayerRef.locked = true;
                return prevLockState;
            } else {
                LayerRef.locked = false;
                return prevLockState;
            };
        };

        layerModule.validOr = function( LayerRef, orValue ) {
            return ( LayerRef && LayerRef.constructor.name === "Layer" && 
                     LayerRef.isValid ) ? LayerRef : orValue;
        };

    }; // End moduleClass

    //--------------------------
    // End layer class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
