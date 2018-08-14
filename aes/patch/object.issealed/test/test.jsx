#include '../issealed.js'

const obj = {
  prop: 42
};

$.writeln( Object.isSealed(obj) === false);
