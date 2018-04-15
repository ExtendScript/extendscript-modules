var argv    = require('minimist')(process.argv.slice(3)); // Remove nodePath, tape, scriptpath
var estktap = require('estktap');
var path    = require('path');
var os = require('os');

var targets = (argv._.length === 0) ? ["undefined"] : argv._;
var tLen = targets.length, tI = 0;

for (tI = 0; tI < tLen; tI++) { 
    var myTarget = targets.pop();
    estktap(os.type() + ' ' + myTarget + ' array.isarray test', path.join(__dirname, '/test.jsx'), true, [myTarget]);
};
