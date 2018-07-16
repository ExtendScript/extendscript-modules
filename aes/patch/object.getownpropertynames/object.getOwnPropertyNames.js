// Source: https://github.com/ExtendScript/extendscript-es5-shim/blob/master/Object/getOwnPropertyNames.js

if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function(obj) {

        if (Object(obj) !== obj) {
            throw new TypeError('Object.getOwnPropertyNames can only be called on Objects.');
        }

        var result = [];

        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

        for (var prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        var properties = obj.reflect.properties;
        var methods = obj.reflect.methods;
        var all = methods.concat(properties);

        for (var i = 0; i < all.length; i++) {
            var prop = all[i].name;
            if (hasOwnProperty.call(obj, prop) && !(propertyIsEnumerable.call(obj, prop))) {
                result.push(prop);
            }
        };

        return result;
    };
}
