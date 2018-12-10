#include '../node_modules/@extendscript/aes.patch.array.foreach/foreach.js'
#include '../node_modules/@extendscript/aes.patch.array.isarray/isarray.js'
#include '../node_modules/@extendscript/aes.patch.array.indexof/indexof.js'
#include '../node_modules/@extendscript/aes.patch.json/json.js'
#include '../validate.js'

var errors = JSON.validate('apple', {type: 'string', maxLength: 5});

$.writeln( errors.length === 0);
