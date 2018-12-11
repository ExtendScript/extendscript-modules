# jaw

[![version](https://img.shields.io/npm/v/@extendscript/aes.util.jaw.svg)](https://www.npmjs.org/package/@extendscript/aes.util.jaw)

> Object Manager

Jaw is a data controller that wraps JSON objects with JSON-schema. It provides an easy to use, chaining API for managing JSON instances in ExtendScript.

## Install

    npm install @extendscript/aes.util.jaw

## Include

    #include 'node_modules/@extendscript/aes.util.jaw/jaw.js'

## Use

Init Jaw with a [schema](http://json-schema.org/) generate an instance that creates all the required properties:

    var schema = {
        "title": "Test",
        "type" : "object",
        "properties": {
            "a"        : {"type": "string"},
            "b"        : {"type": "object"}
        },
        "required" : ["a"]
    }

    var Jaw = Sky.getUtil("jaw").init( schema )

    console.log( Jaw.get() )

Output: `{ a : "" }` 

You can also generate **all** properties by passing a `boolean` like so:

    var Jaw = Sky.getUtil("jaw").init( schema, true )
 
    console.log( Jaw.get() )

Output: `{ a : "", b : {} }` 


**Or** you can wrap Jaw arround existing objects. Keep in mind that these will be validated against the given schema. Jaw will try and generate any requirements that are missing or needed:

    // schema from above
    
    var obj = { x : 0 }
    Jaw = new jaw( schema, obj )

    console.log( Jaw.get() )
    console.log( Jaw.get() === obj)


Output: `{ a : "", x : 0 }`, `true` 

### Set and Get
We can set property values using simple dot notation. The `set()` function can generate deep structures on the fly. The `get()` command is used to retrieve values.

    // Schema from above
    Jaw.set( "b.c.0.d", 10 )  

    console.log( Jaw.get('b.c.0') ) 

Output: `{ d : 10 }`

Not specifying a path always returns the complete object:

    console.log( Jaw.get() )  

Output: `{ a : "", b : { c : [{ d : 10 }] } }`


### Validate

There are two ways of validating depending on the type of return you're after. `validate()` returns an array of errors and `isValid()` returns a boolean:

    var result = Jaw.wrap( obj ).isValid()
  
    console.log( result )

Output: `true` (No errors, object is succesfully validated against schema.)

    var result = Jaw.wrap( obj ).validate()
  
    console.log( result )

Output: `[]` (No errors, object is succesfully validated against schema.)


## Errors
All errors are saved into an error stack you can access with the `errors()` function:

    console.log( Jaw.getErrors() )

Output: `[]` (No errors)


Advanced Use
------------

Besides the getters and setters Jaw implements some familiar tools for easy manipulation of existing properties.

**Any type**

  - .delete ( `path` )
  - .clone ( `path` )

**Array types**

  - .push ( `path` )
  - .pop ( `path` )
  - .unshift ( `path` )
  - .shift ( `path` )
  - .splice ( `path`, `index`, `clear`, `element`, `element`, `etc...` )


## Chaining

You can chain commands together:

    var result = Jaw
        .set( "b.c.0.d", 10 )
        .get( "b.c.0" );
 
    console.log( result )

Output: `{ d : 10 }`


## Validating a Schema

You can also validate Schemas:

    var schemaIsValid = new jaw( schema ).isValid();
    
    console.log( schemaIsValid )

Output: `true`


## Generate Templates
Get the default instance of the schema by calling `getTemplate`:

    Jaw.getTemplate()
    
Output: `{ a : "" }`

    var allProperties = true;
    Jaw.getTemplate( allProperties )
    
Output: `{ a : "", b : {} }`

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
