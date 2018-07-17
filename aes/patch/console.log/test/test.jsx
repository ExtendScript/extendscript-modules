#include '../console.log.js'

// Remove logfile if exist
if( console.logFile.exists ) {
    console.logFile.remove();
};

// Only write to file log
console.settings.writeToConsole = false;

console.log("This is a log test...");

$.writeln( console.logFile.exists === true );
