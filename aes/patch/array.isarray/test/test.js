var argv    = require('minimist')(process.argv.slice(3)); // Remove nodePath, tapePath, scriptpath
var shell   = require('shelljs');

var targets = argv._;

shell.exec('tape ./test/testTargets.js ' + targets.join(" ") + " | tap-markdown")
     .to('./test/Results.md')
     .sed('-i', '# Tests', '# Test ' + targets.join(", "), './test/Results.md');
