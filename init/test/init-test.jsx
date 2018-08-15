#include "../init.js"

var GlobalX233 = function() {
    $.global.X = 33;
};

Sky.IQ.add( GlobalX233 );

Sky.init();

$.writeln( X === 33);
