# json.validate

[![version](https://img.shields.io/npm/v/@extendscript/aes.patch.json.validate.svg)](https://www.npmjs.org/package/@extendscript/aes.patch.json.validate)

> Extension

Adds `validate()` to JSON. Validate a JSON objects to Schema.

Source: [iclanzan/jassi](https://github.com/iclanzan/jassi)

## Install

    npm install @extendscript/aes.patch.json.validate

## Include

    #include 'node_modules/@extendscript/aes.patch.json.validate/validate.js'

## Use

    errors = JSON.validate('apple', {type: 'string', maxLength: 5});

    if (0 === errors.length) {
        // validation passed, do something here
    }
    else {
        // validation failed, print the errors
        errors.forEach(function(error) {
            console.log(error.property + ': ' + error.message);
        });
    }

## Test

You can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test target-1 target-2

We keep [a log of test results](./test/results_log.md)
