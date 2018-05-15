/*                                 
 *   A console for ExtendScript 
 *   Bruno Herfst 2017
 */

var console = {
    logFile : function() {
        return File($.fileName.toString().replace(/[^\\\/]*$/, '') + "test.log");
    },
    write : function( input ) {
        //Log file
        var logFile = this.logFile();
        var output = JSON.stringify(input);
        logFile.open("a");
        logFile.write(output);
        logFile.close();
        //Extendscript Console
        $.write(output);
    },
    writeln : function( input ) {
        //Log file
        var logFile = this.logFile();
        logFile.open("a");
        logFile.writeln(String(input));
        logFile.close();
        //Extendscript Console
        $.writeln(String(input));
    },
    log : function (input, o) {
        var now = new Date();
        var output = now.toTimeString() + ": " + JSON.stringify(input);
        this.writeln(output, o);
    },
    alert : function( input ) {
        this.log(input);
        alert(input);
    },
    clear : function() {
        //Log file
        var logFile = this.logFile();
        logFile.open("w");
        logFile.write("");
        logFile.close();
        //Extendscript Console
        if (app.name === "ExtendScript Toolkit") { 
            app.clc(); 
        } else {
            var estApp = BridgeTalk.getSpecifier("estoolkit");
            if(estApp) {
                var bt = new BridgeTalk;
                bt.target = estApp;
                bt.body = "app.clc()";
                bt.send();
            }
        }
    }
}