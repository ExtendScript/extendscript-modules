var argv = require('minimist')(process.argv.slice(2)); // Remove nodePath, scriptpath
var tapes = require("@extendscript/tap-es"), targets = argv._, d = require('path').resolve(__dirname);
tapes.reportDuration(false);
tapes.reportScriptName(true);

tapes.add('menuloader', d+'/test*.jsx', targets, true);
tapes.run(d+'/results.md');
