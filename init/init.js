/*

    ExtendScript Modules Init
    https://github.com/ExtendScript/extendscript-modules

*/

(function(HOST, SELF) {  
    // The HOST/SELF setup was suggested by Marc Autret
    // https://forums.adobe.com/thread/1111415
    var VERSION = 2.2;

    if(HOST[SELF] && HOST[SELF].version > VERSION) return HOST[SELF];  
    HOST[SELF] = SELF;
    SELF.version = VERSION;  

    //    P R I V A T E
    //---------------------
    var INNER = {};  

    INNER.manage = function (hanger, path, depth, callback, upsert) {
        var err = null;

        for (var i = 0; i < depth; i++) {
            var key = path[i];

            if(hanger != null) {
                "undefined" === typeof hanger[key] && upsert && (hanger[key] = isNaN(path[i + 1]) && {} || []); // If next key is an integer - create an array, else create an object.
                if("undefined" === typeof (hanger = hanger[key])) {
                    break;
                };
            } else {
                err = new TypeError("Cannot read property " + key + " of " + (null === hanger && 'null' || typeof hanger));
                break;
            };
        };
        if(callback) {
            return callback(err, hanger);
        } else {
            return err || hanger;
        };
    };

    INNER.get = function( hanger, path, callback ) {
        var err = null;
        var pathArr = path && path.split(".") || [];
        var result = INNER.manage(hanger, pathArr, pathArr.length, undefined, false);
        if(!result) err = new TypeError("Could not get " + hanger.name + " " + path);
        if(callback) {
            return callback(err, result);
        } else {
            return err || result;
        };
    };

    INNER.set = function ( hanger, path, value, callback ) {
        var pathArr = path && path.split(".") || [];
        var depth = pathArr.length - 1;
        var lastKey = pathArr[depth];
        var upsert = true;
        var result = callback || INNER.manage(hanger, pathArr, depth, callback, upsert);
        var setter = function (obj, key, val) {
                return null != obj && key ? obj[key] = val :
                    new TypeError("Cannot set property " + key + " of " + (null === obj && 'null' || typeof obj));
            };

        if(callback) {
            INNER.manage(hanger, pathArr, depth, function (err, obj) {
                err || (result = setter(obj, lastKey, value)) instanceof Error && (err = String(result));
                callback(err, !err && hanger);
            }, upsert);
        } else {
            if(result instanceof Error || (result = setter(result, lastKey, value)) instanceof Error) {
                throw result;
            }
        };

        return SELF;
    };
    
    INNER.initQueue = function () {
        var IQ = this;
        IQ.queue = [];

        IQ.add = function ( initFun ) {
            if(typeof initFun === 'function') {
                IQ.queue.push( initFun );
            } else {
                throw new Error("Only callable items like functions are allowed into the Init Queue. Ignored the request for " + typeof initFun );
            };
        };

        IQ.run = function(){
            for (var i = 0, len = IQ.queue.length; i < len; i++) {
                IQ.queue[i]();
            };
        };
    };

    //    P U B L I C 
    //---------------------

    SELF.patch  = { name: "patch"   };
    SELF.module = { name: "module"  };
    SELF.util   = { name: "utility" };

    SELF.IQ = new INNER.initQueue;
    SELF.init = function() {
        SELF.IQ.run();
    };

    SELF.unload = function() {  
        var k;  
        for( k in INNER ) {  
            if( !(INNER.hasOwnProperty(k)) ) continue;  
            INNER[k]=null;  
            delete INNER[k];  
        };
        for( k in SELF ) {  
            if( !(SELF.hasOwnProperty(k)) ) continue;  
            SELF[k]=null;  
            delete SELF[k];  
        }  
        INNER = SELF = null;  
    };

    SELF.getPatch = function( path, callback ) {
        return INNER.get(SELF.patch, path, callback);
    };

    SELF.getModule = function( path, callback ) {
        return INNER.get(SELF.module, path, callback);
    };

    SELF.getUtil = function( path, callback ) {
        return INNER.get(SELF.util, path, callback);
    };

    SELF.setPatch = function( path, value, callback ) {
        return INNER.set(SELF.patch, path, value, callback);
    };

    SELF.setModule = function( path, value, callback ) {
        return INNER.set(SELF.module, path, value, callback);
    };

    SELF.setUtil = function( path, value, callback ) {
        return INNER.set(SELF.util, path, value, callback);
    };

})($.global,{toString:function(){return 'Sky';}});
