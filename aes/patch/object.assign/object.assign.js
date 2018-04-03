/**
 * Source: https://gist.github.com/WebReflection/10404826
 */

if (!Object.assign) {
  (function() {
    Object.assign = (function(has) {
      'use strict';
      return assign;
      function assign(target, source) {
        for (var i = 1; i < arguments.length; i++) {
          copy(target, arguments[i]);
        }
        return target;
      }
      function copy(target, source) {
        for (var key in source) {
          if (has.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }({}.hasOwnProperty));
  }());
}
