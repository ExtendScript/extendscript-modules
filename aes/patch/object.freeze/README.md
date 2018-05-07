# object.freeze

> ES5 Sham

The `Object.freeze()` method freezes an object: that is, prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed, it also prevents the prototype from being changed. The method returns the passed object.

Source: [ps-scripting-es5shim](https://github.com/EugenTepin/ps-scripting-es5shim/blob/master/lib/Object/freeze.js)

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
