#include '../array.js'

var loaded = false;

if ( Array.prototype.every       &&
     Array.prototype.filter      &&
     Array.prototype.find        &&
     Array.prototype.forEach     &&
     Array.from                  &&
     Array.prototype.indexOf     &&
     Array.isArray               &&
     Array.prototype.lastIndexOf &&
     Array.prototype.map         &&
     Array.prototype.reduce      &&
     Array.prototype.reduceRight &&
     Array.prototype.some        ) {
    loaded = true;
}

$.writeln( loaded === true );
