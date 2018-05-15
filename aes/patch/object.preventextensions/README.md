# object.preventextensions

> ES5 Sham

The `Object.preventExtensions()` method prevents new properties from ever being added to an object (i.e. prevents future extensions to the object).

> __WARNING__ Silently fails in ExtendScript. This should be fine unless you are depending on the safety and security provisions of this method.

Source: [ps-scripting-es5shim](https://github.com/EugenTepin/ps-scripting-es5shim/blob/master/lib/Object/preventExtensions.js)

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
