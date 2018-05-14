var argv = require('minimist')(process.argv.slice(2)); // Remove nodePath, scriptpath
var tapes = require("tap-es"), targets = argv._, d = require('path').resolve(__dirname);

tapes.reportDuration(false);

tapes.add('object.getownpropertynames', d+'/*.jsx', targets, true);
tapes.run(d+'/results.md');
