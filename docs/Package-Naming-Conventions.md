# Scoped Package Naming Convention
Being able to quickly find the package you need is important for the enjoyment and use of these packages. Therefore it is important to use clear package names. This is a simple guide to our package naming convention.

A package name generally consists of these three parts:

## 1. Package Target

The first element in a package name is the 'Package Target'. If your script does not fit inside the targets below, please submit an issue request as we might need to add a missing category.

    aes     : Targets ExtendScript (or all)
    ind     : Targets InDesign
    ps      : Targets Photoshop
    ai      : Targets Illustrator
    afx     : Targets After Effects
    bridge  : Targets Bridge
    acrobat : Targets Acrobat
    sui     : Targets ScriptUI  

## 2. Package Subject (Target Object)

Following the Package Target, we add a 'Package Subject' (target object). Or whatever is affected by this module. You can follow the naming convention of the ExtendScript SDK.

    patch  : Polyfills
    util   : Utilities
    module : Modules
    bundle : Bundle of packages

## 3. Package Verb (Action)

The name of your object or module. It is generally preferable to use an active verb.

## Sample

Now from the above let's say we have created a generic document builder for InDesign. In that case, the package name should be: `ind.module.documentBuilder` so the complete [scoped name](https://docs.npmjs.com/misc/scope) becomes `@extendscript/ind.module.documentBuilder`

