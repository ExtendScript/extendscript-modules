#include '../isfrozen.js'

var object1 = {
  property1: 42
};

// Note: Object.freeze does not work in ExtendScript
$.writeln( Object.isFrozen(object1) === false );
