
// JSON is a peer dependency so will be loaded

if (typeof JSON.clone !== 'function') {

    // The clone method takes a JSON object and returns a clone of the JSON object.

    JSON.clone = function ( json_obj ) {
        if (typeof json_obj === undefined) {
            return undefined;
        };
        return JSON.parse(JSON.stringify( json_obj ));
    };

};
