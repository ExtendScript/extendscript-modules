var argv    = require('minimist')(process.argv.slice(2)); // Remove nodePath, scriptpath
var shell   = require('shelljs');

var targets = argv._;

shell.exec('tape ./test/testTargets.js ' + targets.join(" ") + " | tap-markdown")
     .to('./test/results.md');