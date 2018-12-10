# API Registry
To not pollute the global scope, and make it easy for modules to interconnect, we attach all methods to a shared global variable. We keep a registry of properties that might be loaded into the shared API called `Sky`.

    $.global.Sky

The `Sky` object is created by the [`modules.init`](../init) module. All sub-modules will be loaded under `Sky.module` and `Sky.util`. The main module should therefore be a [peer dependency](https://nodejs.org/en/blog/npm/peer-dependencies/) of any ExtendScript Module.

  * Properties in _italic_ do not exist but are reserved.
  * Properties in __bold__ are open to sub methods (preferred)
  * The registry is case-insensitive

## Adobe ExtendScript (aes)
  * [__patch__](../aes/patch)
    * __patch.array__
      * [patch.array.every](../aes/patch/array.every)
      * [patch.array.filter](../aes/patch/array.filter)
      * [patch.array.find](../aes/patch/array.find)
      * [patch.array.foreach](../aes/patch/array.foreach)
      * [patch.array.from](../aes/patch/array.from)
      * [patch.array.indexof](../aes/patch/array.indexof)
      * [patch.array.isarray](../aes/patch/array.isarray)
      * [patch.array.lastindexof](../aes/patch/array.lastindexof)
      * [patch.array.map](../aes/patch/array.map)
      * [patch.array.reduce](../aes/patch/array.reduce)
      * [patch.array.reduceright](../aes/patch/array.reduceright)
      * [patch.array.some](../aes/patch/array.some)
    * __patch.bundle__
      * [patch.bundle.array](../aes/patch/bundle.array)
      * [patch.bundle.es5](../aes/patch/bundle.es5)
      * [patch.bundle.es6](../aes/patch/bundle.es6)
    * __patch.console__
      * [patch.console.log](../aes/patch/console.log)
    * __patch.function__
      * [patch.function.bind](../aes/patch/function.bind)
    * [__patch.json__](../aes/patch/json)
      * [patch.json.clone](../aes/patch/json.clone)
      * [patch.json.comparable](../aes/patch/json.comparable)
      * [patch.json.cycle](../aes/patch/json.cycle)
      * [patch.json.equals](../aes/patch/json.equals)
      * [patch.json.file](../aes/patch/json.file)
      * [patch.json.instantiate](../aes/patch/json.instantiate)
      * [patch.json.parserecurse](../aes/patch/json.parserecurse)
      * [patch.json.parsestate](../aes/patch/json.parsestate)
      * [patch.json.validate](../aes/patch/json.validate)
    * __patch.number__
      * [patch.number.isfinite](../aes/patch/number.isfinite)
    * __patch.object__
      * [patch.object.assign](../aes/patch/object.assign)
      * [patch.object.create](../aes/patch/object.create)
      * [patch.object.defineproperties](../aes/patch/object.defineproperties)
      * [patch.object.defineproperty](../aes/patch/object.defineproperty)
      * [patch.object.freeze](../aes/patch/object.freeze)
      * [patch.object.getownpropertydescriptor](../aes/patch/object.getownpropertydescriptor)
      * [patch.object.getownpropertynames](../aes/patch/object.getownpropertynames)
      * [patch.object.getprototypeof](../aes/patch/object.getprototypeof)
      * [patch.object.isextensible](../aes/patch/object.isextensible)
      * [patch.object.isfrozen](../aes/patch/object.isfrozen)
      * [patch.object.issealed](../aes/patch/object.issealed)
      * [patch.object.keys](../aes/patch/object.keys)
      * [patch.object.preventextensions](../aes/patch/object.preventextensions)
      * [patch.object.seal](../aes/patch/object.seal)
      * [patch.object.setprototypeof](../aes/patch/object.setprototypeof)
    * __patch.string__
      * [patch.string.trim](../aes/patch/string.trim)
  * __module__
  * __util__
      * [__util__.jaw](../aes/util/jaw)
      * [__util.schema__](../aes/util/schema)
        * [util.schema.document](../aes/util/schema/document)

## Script UI (sui)
  * __module__
    * [module.jaxon](../sui/module/jaxon)
  * __util__
    * [module.groupList](../sui/module/grouplist)

## InDesign (ind)
  * __module__
    * [module.docbuilder](https://github.com/CoverBuilder/General-Document-Builder)
    * [module.jaxon](../ind/module/jaxon)
    * [module.outerspace](../ind/module/outerspace)
  * __util__
    * [util.bounds](../ind/util/bounds)
    * [util.font](../ind/util/font)  
    * [util.layer](../ind/util/layer)
    * [util.menuloader](../ind/util/menuloader)
    * [util.objectstyle](../ind/util/objectstyle)
    * [util.pageitems](../ind/util/pageitems) 
    * [util.pages](../ind/util/pages)
    * [util.rulers](../ind/util/rulers)
    * [util.styles](../ind/util/styles)    

## Photoshop (ps)
  * __module__
    * [_module.docbuilder_](https://github.com/GitBruno/General-Document-Builder)
    * [module.jam](../ps/module/jam)
      * [jam.actions](../ps/module/jam/jam.actions)
      * [jam.books](../ps/module/jam/jam.books)
      * [jam.colors](../ps/module/jam/jam.colors)
      * [jam.engine](../ps/module/jam/jam.engine)
      * [jam.helpers](../ps/module/jam/jam.helpers)
      * [jam.json](../ps/module/jam/jam.json)
      * [jam.layers](../ps/module/jam/jam.layers)
      * [jam.shapes](../ps/module/jam/jam.shapes)
      * [jam.styles](../ps/module/jam/jam.styles)
      * [jam.text](../ps/module/jam/jam.text)
      * [jam.utils](../ps/module/jam/jam.utils)
  * __util__

## Illustrator (ai)
  * __module__
    * [_module.docbuilder_](https://github.com/GitBruno/General-Document-Builder)
  * __util__

## After Effects (afx)
  * __module__
  * __util__

## Bridge
  * __module__
  * __util__

## Acrobat
  * __module__
  * __util__
