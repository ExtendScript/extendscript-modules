/*

    ExtendScript Modules
    https://github.com/ExtendScript/extendscript-modules

*/

$.global.hasOwnProperty('Sky')||(function(HOST, SELF) {  
    // The HOST/SELF setup was suggested by Marc Autret
    // https://forums.adobe.com/thread/1111415
    var VERSION = 0.1;

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
                }
            } else {
                err = new TypeError("Cannot read property " + key + " of " + (null === hanger && 'null' || typeof hanger));
                break;
            }
        }
        if(callback) {
            return callback(err && String(err), !err && hanger);
        } else {
            return err || hanger;
        }
    };

    INNER.get = function( hanger, path, callback ) {
        var pathArr = path && path.split(".") || [];
        return INNER.manage(hanger, pathArr, pathArr.length, callback, false);
    };

    INNER.set = function ( hanger, path, value, callback ) {
        var pathArr = path && path.split(delim) || [];
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

    //    P U B L I C 
    //---------------------

    SELF.patch = {};
    SELF.module = {};
    SELF.util = {};
    
    // generic unload pattern  
    // ---  
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
