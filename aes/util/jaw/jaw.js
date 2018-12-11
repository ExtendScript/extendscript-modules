(function () {
    var VERSION = 1.0;
    var MODULE_PATH = "jaw";

    var thisModule = Sky.getUtil(MODULE_PATH);
    if( thisModule && thisModule.version >= VERSION) {
      return;
    };

    //--------------------------
    // Start jaw class

    function moduleClass( Schema, instance ) {
        // Self-invoking constructor
        //if(!(this instanceof moduleClass)) {
        //    return new moduleClass(Schema, instance);
        //};

        var jaw = this;
        jaw.version = VERSION;
        jaw.description = "Jaw provides an easy to use, chaining API for managing JSON instances in ExtendScript.";

        //- - - - - - - - - - - - - - - - - - - - - - 
        // Module code from here...
        //- - - - - - - - - - - - - - - - - - - - - - 

        var delim = ".";
        var objRef = [new Object()]; // Object Reference

        var setObjRef = function( ref ) {
            // We save original object reference in array
            objRef = [ref];
            return jaw;
        };

        var _Schema = {};

        var _isValid = {
            schema : true ,
            object : true ,
            all : function(){
                return (this.schema && this.object);
            }
        };

        // The error stack holds all errors
        var errorStack   = [];

        // The validation stack holds all validation errors
        // This is reset every time the isValid() function is called
        var validationStack   = [];

        var errHandler = function(err, obj) {
            //err: null or string with error description "TypeError: cannot set property 'undefined' of number"
            //obj: updated object { a : { b : [{ c : 10 }] } }
            if( err === null ) {
                return jaw;
            } else if( typeof err === "string") {
                errorStack.unshift(err);
            } else if( Array.isArray(err) ) {
                errorStack = err.concat(errorStack);
            } else {
                errorStack.unshift( JSON.stringify(err) );
            };
            return jaw;
        };

        var valueHandler = function(err, obj) {
            //err: null or string with error description "TypeError: cannot set property 'undefined' of number"
            //obj: updated object { a : { b : [{ c : 10 }] } }
            if( err === null ) {
                return obj;
            } else if( typeof err === "string") {
                errorStack.unshift(err);
            } else if( Array.isArray(err) ) {
                errorStack = err.concat(errorStack);
            } else {
                errorStack.unshift( JSON.stringify(err) );
            };
            return undefined;
        };

        function _call( description, obj, callback ){
            // description: null or error description string
            // obj: value of the certain object[key] or undefined
            if(typeof callback !== "function") {
                return obj;
            } else {
                callback(description, obj);
                return jaw;
            }
        };

        function _logCall( description, obj, callback ){
            // description: null or error description string
            // obj: value of the certain object[key] or undefined
            errHandler( description );
            return _call( description, obj, callback );
        };

        function pathOK( path ) {
            if( typeof path === 'string' || typeof path === 'undefined') {
                return { problem: false, description: "OK" };
            } else {
                var errMessage = "Type of path should be string or undefined but was " + typeof path;
                errHandler( errMessage );
                return { problem: true, description: errMessage };
            };
        };

        function setSchema( Schema ){
            // Validate given schema
            if(typeof Schema === 'object') {
                _Schema = JSON.clone( Schema );
            } else {
                return errHandler( "Can't set schema to non-object." );
            };

            // Shema is object, let's make sure it has a type property as well
            var result = JSON.validate( jaw.getSchema(), {"type": "object","required": ["type"]} );
            if( result.length > 0 ) {
                _isValid.schema = false;
                return errHandler("Schema not valid (Missing type property).");
            };

            // Validating against a fresh instance from schema should always work
            // If not, there is something wrong with the schema
            var result = JSON.validate( jaw.getTemplate( true ), jaw.getSchema() );
            if( result.length > 0 ) {
              _isValid.schema = false;
              errHandler( result );
              return errHandler("Schema not valid (Could not generate valid instance from shema).");
            };

            return jaw;
        };

        function userException(message) {
            this.message = message;
            this.name = 'Error';
        };

        function validateManager(){
            validationStack = JSON.validate( jaw._get(), jaw.getSchema() );  
            if( validationStack.length > 0 ) {
                _isValid.object = false;
            } else {
                _isValid.object = true;
            }
            return jaw;
        };
        
        function copyKeys(fromObj, toObj) {
            if( typeof fromObj !== 'object' || typeof toObj !== 'object' ) {
                return errHandler("jaw.copyKeys(): Two objects expected but received " + typeof fromObj + " and " + typeof toObj);
            };
            Object.keys(fromObj).forEach(function(key) {
                toObj[key] = fromObj[key];
            });
            return jaw;
        };
        
        // Array tools
        function unshiftPush( path, unshiftPush, args, callback ) {
            // Param unshiftPush: Boolean true for unshift false for push

            var arr = jaw.get(path);

            if( arr === undefined || arr === false ) {
                arr = args; // Add new array  
                jaw._set(path, arr, callback);
            } else if ( Array.isArray(arr) ) {
                if( unshiftPush ) {
                    Array.prototype.unshift.apply( arr, args );
                } else {
                    Array.prototype.push.apply( arr, args );
                }
                jaw._set( path, arr, callback);
            } else {
                return _log_call("jaw.pushShift: path does not result in array.", undefined, callback);
            };

            return validateManager();
        };

        function processCallBack( callback ){
            if(typeof callback !== 'function') {
                return function() {
                    return jaw;
                };
            } else {
                return callback;
            }
        };

        function shiftPop( path, shiftPop, callback ) {
            var arr    = jaw.get(path);
            var result = undefined;

            if( arr === undefined || arr === false ) {
                // There is no array at path
                return result; // Same as running pop() or shift() on empty array
            } else if ( Array.isArray(arr) ) {
                if( shiftPop ) {
                    result = arr.shift();
                } else {
                    result = arr.pop();
                }
            } else {
                return _log_call( "jaw.pop: path does not result in array.", undefined, callback );
            };

            jaw._set( path, arr, callback);
            validateManager();
            return result; // Returns element or undefined
        };

        function deleteProp( obj, path ) {
            var route = path.split(".");
            while (route.length-1 && (obj = obj[route.shift()]));
            delete obj[route.shift()];
        };

        //-----------------
        // Public functions
        //-----------------

        jaw.getObjRef = function() {
            return objRef[0];
        };

        jaw.manage = function (obj, path, depth, callback, upsert) {
            // This function comes from the Object Manager by Dmitry Poklonskiy
            // https://github.com/dimik/object-manager
            var err = null;

            for (var i = 0; i < depth; i++) {
                var key = path[i];

                if(obj != null) {
                    "undefined" === typeof obj[key] && upsert && (obj[key] = isNaN(path[i + 1]) && {} || []); // If next key is an integer - create an array, else create an object.
                    if("undefined" === typeof (obj = obj[key])) {
                        break;
                    }
                } else {
                    err = new TypeError("Cannot read property " + key + " of " + (null === obj && 'null' || typeof obj));
                    break;
                }
            }
            if(callback) {
                return callback(err && String(err), !err && obj);
            } else {
                return err || obj;
            }
        };

        jaw.validate = function() {
            jaw.update();
            return validateManager();
        };

        jaw.isValid = function() {
            jaw.update();
            return _isValid.all();
        };

        jaw.copyKeys = function( fromObj ) {
            return copyKeys(fromObj, jaw._get() );
        };

        jaw.getErrors = function() {
            jaw.update();
            return errorStack.concat(validationStack);
        };

        jaw.wrap = function( inst ) {
            if(typeof inst !== 'object') {
                return errHandler("Wrapping Error: Can't get jaw arround non-object");
            };
            
            // Copy schema keys
            var SchemaInst = JSON.instantiate( jaw.getSchema() );
            if(typeof SchemaInst !== 'object') {
                return errHandler('Wrapping Error: Schema not valid');
            };

            // Copy all keys from given instance to schema instance
            copyKeys(inst, SchemaInst);
            // Copy all keys from schema instance to given instance
            copyKeys(SchemaInst, inst);

            setObjRef( inst );

            return validateManager();
        };

        jaw.getTemplate = function( allProperties ) {
            // allProperties = undefined = false = {requiredPropertiesOnly: true}
            if(typeof allProperties !== 'boolean') {
                var requiredPropertiesOnly = true; // allProperties == false
            } else {
                var requiredPropertiesOnly = !allProperties;
            }
            return JSON.instantiate( jaw.getSchema(), {requiredPropertiesOnly: requiredPropertiesOnly} );
        };

        jaw.getSchema = function() {
            return JSON.clone(_Schema);
        };

        jaw._get = function( path, callback ) {
            if(typeof callback === "undefined") {
                var callback = valueHandler;
            };
            var pathArr = path && path.split(delim) || [];
            return jaw.manage(jaw.getObjRef(), pathArr, pathArr.length, callback, false);
        };

        jaw.get = function( path, callback ) {
            var pathCheck = pathOK(path);
            if ( pathCheck.problem ) {
                return _call( pathCheck.description, undefined, callback );
            };

            jaw.update();
            return jaw._get( path, callback );
        };

        jaw._clone = function( path, callback ) {
            return JSON.clone(jaw._get( path, callback ));
        };

        jaw.clone = function( path, callback ) {
            var pathCheck = pathOK(path);
            if ( pathCheck.problem ) {
                return _call( pathCheck.description, undefined, callback );
            };
            jaw.update();
            return jaw._clone( path, callback );
        };

        jaw._set = function (query, value, callback) {
            var path = query && query.split(delim) || [];
            var depth = path.length - 1;
            var lastKey = path[depth];
            var ctx = jaw.getObjRef();
            var upsert = true;
            var result = callback || jaw.manage(ctx, path, depth, callback, upsert);
            var set = function (obj, key, val) {
                    return null != obj && key ? obj[key] = val :
                        new TypeError("Cannot set property " + key + " of " + (null === obj && 'null' || typeof obj));
                };

            if(callback) {
                jaw.manage(ctx, path, depth, function (err, obj) {
                    err || (result = set(obj, lastKey, value)) instanceof Error && (err = String(result));
                    callback(err, !err && ctx);
                }, upsert);
            } else {
                if(result instanceof Error || (result = set(result, lastKey, value)) instanceof Error) {
                    throw result;
                }
            }

            return jaw;
        };

        jaw.set = function( path, to ) {
            if(pathOK(path).problem) { return jaw; };
            jaw.update();
            jaw._set( path, to, errHandler);
            return validateManager();
        };

        jaw.push = function( path /* element, element, etc */ ) {
            if(pathOK(path).problem) { return jaw; };
            jaw.update();
            var args = Array.prototype.slice.call(arguments, jaw.push.length);
            return unshiftPush( path, false, args );
        };

        jaw.pop = function ( path, callback ) {
            var callback = processCallBack( callback );
            var pathCheck = pathOK(path);
            if ( pathCheck.problem ) {
                return _call( pathCheck.description, undefined, callback );
            };
            jaw.update();
            return shiftPop( path, false, callback );
        }

        jaw.unshift = function( path /* element, element, etc */ ) {
            if(pathOK(path).problem) { return jaw; };
            jaw.update();
            var args = Array.prototype.slice.call(arguments, jaw.unshift.length);
            return unshiftPush( path, true, args );
        };

        jaw.shift = function ( path, callback ) {
            var pathCheck = pathOK(path);
            if ( pathCheck.problem ) {
                return _call( pathCheck.description, undefined, callback );
            };
            jaw.update();
            return shiftPop( path, true, callback );
        };

        jaw.splice = function( path, index, del /* element, element, etc */ ) {
            if(pathOK(path).problem) { return jaw; };
            jaw.update();
            var args = Array.prototype.slice.call(arguments, jaw.splice.length);

            var arr = jaw.get(path);

            if( arr === undefined || arr === false ) {
                arr = new Array(index+del);
            };

            if ( Array.isArray(arr) ) {
                if( (index+del) <= arr.length ) {
                    Array.prototype.splice.apply(arr, [index,del].concat(args) );
                    jaw._set( path, arr, errHandler);
                } else {
                   return errHandler("jaw.splice: index out of range.");
                }
            } else {
                return errHandler("jaw.splice: path does not result in array.");
            };
            
            jaw._set( path, arr, errHandler);
            return validateManager();
        };
        
        jaw.delete = function ( path ) {
            if(pathOK(path).problem) { return jaw; };
            jaw.update();
            deleteProp( jaw._get(), path );
            jaw.copyKeys(jaw.getTemplate( false ) );
            return validateManager();
        };

        jaw.update = function() {
            // Reload instance/reference
            // in case object is updated
            // outside of this manager
            return jaw.wrap( jaw.getObjRef() );
            // This also re-validates
        };

        jaw.reset = function() {
            // Reloads instance/reference
            // and clears error stack
            errorStack = new Array();
            return jaw.update();
        };

        jaw.init = function( Schema, instance ) {
            // invoking constructor
            return new moduleClass( Schema, instance );
        };

        //-----------------
        // Initialise
        //-----------------
        setSchema( Schema );
        if( errorStack.length === 0 ) {
            // Start managing something
            setObjRef( jaw.getTemplate( false ) );
        };

        if(jaw.isValid() && (typeof instance !== 'undefined') ) {
            if(typeof instance === 'boolean') {
                jaw.wrap( jaw.getTemplate( instance ) );
            } else if(typeof instance !== 'object') {
                _valid.object = false;
                errHandler("Initialisation Error: Can't get jaw arround non-object");
            } else {
                jaw.wrap(instance);
            }
        };

    };

    //--------------------------
    // End jaw class

    Sky.setUtil(MODULE_PATH, new moduleClass() );

})();
