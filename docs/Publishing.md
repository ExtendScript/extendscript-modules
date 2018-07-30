# Publishing

All **modules** are published in the `@extendscript` scope.

Creating a module comprises of four stages:

## Stage 1: Update the API Registry

The first step is to add your module to the [API Registry](./API-Registry.md)

## Stage 2. Write-n-Test

There are multipple ways to write and validate your code. See our [Testing Guide](./Testing.md) for testing guidelines. It is recommended to use our [Boilerplate Module](../boilerplates/module).

## Stage 3. Check Package

A couple of things to double check:

  1. Name of the package reflects the structure of [API Registry](./API-Registry.md) and follows the [Package Naming Conventions](./Package-Naming-Conventions.md)
  2. Version of the package is correct. We use semantic versioning where initial release for public use is `1.0.0` 
  3. The name of the main entry script is the same as last section of module name. Therefore the main script file for `ind.tools.documentbuilder` is called `documentbuilder.js`

Some things to look out for if you did not use our [Boilerplate Module](../boilerplates/module):

  * The `package.json` contains a `prepublishOnly` script set to `npm config set scope extendscript`
  * The package contains a `.npmignore` file that exclude all files that should be excluded from the package

## 4. Publish your code

Publish your module with the `--access public` flag:

    npm publish --access public
