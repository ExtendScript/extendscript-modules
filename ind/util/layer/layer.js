(function () {
    var VERSION = 0.1;
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

        layerModule.getByName = function( doc, layerName, createBool ) {
            // Returns requested layer reference || undefined,
            // if createBool == true; returns new layer with layerName

            // Parse input
            if (!doc.isValid) return new Error("Not a valid document...");
            var createBool = createBool === true;
            var layerName = String(layerName);

            for (var i=0; i < doc.layers.length; i++) {
                if (doc.layers[i].name == layerName) return doc.layers[i];
            };

            if( createBool ) {
                return doc.layers.add({name:layerName});
            } else {
                return undefined;
            };
        };

        layerModule.getSelect = function( doc, layerName, createBool ) {
            var layerRef = layerModule.getByName( doc, layerName, createBool );
            if( layerRef.isValid ) {
                return layerModule.select( layerRef );
            } else {
                return layerRef;
            };
        };

        layerModule.getSelectMove = function( doc, layerName, afterlayerNo, createBool ) {
            var layerRef = layerModule.getSelect(doc, layerName, createBool);
            if( layerRef.isValid ) {
                return layerModule.move( layerRef, afterlayerNo);
            } else {
                return layerRef;
            };
        };

        layerModule.locker = function( layerRef, lockBool ) {
            // lockBool: True:  layer will be locked
            // lockBool: False: layer will be unlocked
            // lockBool: Not true nor false: Layer lock will be toggled
            
            // Returns: The previous lock state
            var prevLockState = layerRef.locked;

            if(typeof lockBool !== 'boolean'){
                // Toggle!
                var lockBool = !prevLockState;
            };

            if(lockBool){
                layerRef.locked = true;
                return prevLockState;
            } else {
                layerRef.locked = false;
                return prevLockState;
            };
        };

        layerModule.move = function( layerRef, afterlayerNo ) {
            // returns layerRef or Error
            try {
                layerRef.move( LocationOptions.AFTER, layerRef.parent.layers[afterlayerNo] );
                return layerRef
            } catch ( error ) {
                return error;
            };
        };

        layerModule.select = function( layerRef ) {
            // returns layerRef or Error
            try {
                var doc = layerRef.parent;
                doc.activeLayer = layerRef;
                return layerRef;
            } catch ( error ) {
                return error;
            };
        };

    }; // End moduleClass

    //--------------------------
    // End layer class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
