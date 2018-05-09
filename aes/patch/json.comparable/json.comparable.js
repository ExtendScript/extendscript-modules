/*
    json.equals
    https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects
*/

if (typeof JSON.comparable !== 'function') {
    JSON.comparable = function ( _this , _that ) {
        // We create an object of the data
        var __this = {"_":_this};
        var __that = {"_":_that};

        var comparable = function comparable( o ) {
            return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) != 'object' || !o ? o : Object.keys(o).sort().reduce(function (c, key) {
                return c[key] = comparable(o[key]), c;
            }, {});
        };

        return (JSON.stringify(comparable(__this)) == JSON.stringify(comparable(__that)));        
    };
};
