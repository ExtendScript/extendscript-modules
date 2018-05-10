# API Registry
To not pollute the global scope, and make it easy for modules to talk to eachother, it is recommended to attach methods to a shared global variable. We keep a registry of properties that might be loaded into the shared API called `myApp`.

    $.myApp

The `myApp` object is managed by the user. All modules will be loaded under the `myApp.module` and `myApp.util` property.

  - Properties in _italic_ do not exist but are reserved.
  - Properties in __bold__ are open to sub methods (preferred)
  - The registry is case-insensitive

## All
  * __module__
  * __util__

### Adobe ExtendScript (aes)
  * [__patch__](../aes/patch) (A collection of polyfills)

### Script UI (sui)
  * __module__

## InDesign (ind)
  * __module__.docBuilder ([General Document Builder](https://github.com/GitBruno/General-Document-Builder))

## Photoshop (ps)
  * __module__.docBuilder ([General Document Builder](https://github.com/GitBruno/General-Document-Builder))

## Illustrator (ai)
  * __module__.docBuilder ([General Document Builder](https://github.com/GitBruno/General-Document-Builder))

## After Effects (afx)
  * __module__

## Bridge
  * __module__

## Acrobat
  * __module__
