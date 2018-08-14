/*                                 
 *   A console for ExtendScript 
 *   Bruno Herfst 2017
 */

var console = {
    settings : {
        writeToFile : true,
        writeToConsole  : true
    },
    logFile : (function() {
        var sName = File($.fileName).name;
        var sPath = File($.fileName).path;

        var lastPeriod = sName.lastIndexOf(".");
        if (lastPeriod > 0) { // Ignore hidden files
            sName = sName.substr(0, lastPeriod);
        };
        
        return File( sPath + "/" + sName + ".log");
    })(),
    write : function( msg ) {
        this.logFile.open("a");
        this.logFile.write(output);
        this.logFile.close();
        if (this.settings.writeToConsole) {
            $.write( String(msg) );
        };
    },
    writeln : function( msg ) {
        this.logFile.open("a");
        this.logFile.writeln(String(msg));
        this.logFile.close();
        if (this.settings.writeToConsole) {
            $.writeln( String(msg) );
        };
    },
    log : function ( msg ) {
        var now = new Date();
        var output = now.toTimeString() + ": " + String(msg);
        this.writeln( output );
    },
    alert : function( msg ) {
        this.log(msg);
        alert(msg);
    },
    clear : function() {
        this.logFile.open("w");
        this.logFile.write("");
        this.logFile.close();
        if (this.settings.writeToConsole) {
            if (app.name === "ExtendScript Toolkit") { 
                app.clc(); 
            } else {
                var estApp = BridgeTalk.getSpecifier("estoolkit");
                if(estApp) {
                    var bt = new BridgeTalk;
                    bt.target = estApp;
                    bt.body = "app.clc()";
                    bt.send();
                };
            };
        };
    }
};
