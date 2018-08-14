
// JSON is a peer dependency so will be loaded

// At the moment the user will be notified. Not sure if this is good practise.
// Extendscripters is still working on the error handling so I'll wait until
// this is resolved and handle errors properly following the guidelines

if (typeof JSON.saveFile !== "function") {

    // The saveFile method takes a JSON instance and saves it the the given File object.
    // Optional question string, usefull if you want users permission first.
    // returns Object or false

    JSON.saveFile = function (File, Obj, saveQuestion){
        if(typeof saveQuestion === "String") {
            if( !confirm(saveQuestion) ) {
                // User does not want to save this
                // Try a better question
                return false;
            }
        }
        var objStr = JSON.stringify(Obj);
        File.open('w');
        var ok = File.write(objStr);
        if (ok) {
            ok = File.close();
        }
        if (!ok) {
            alert("JSON.saveFile: Error saving file. \n" + File.error);
            File.close();
        }
        return Obj;
    }
};

if (typeof JSON.openFile !== "function") {

    // The openFile method takes a File object return the parsed content.

    JSON.openFile = function (File){
        if( File ){
            File.open('r');
            var content = File.read();
            var obj = JSON.parse(content);
            File.close();
        }else{
            alert("JSON.openFile: Could not open file."); // if something went wrong
        }
        return obj; // Parsed value or undefined
    }
};