# menuloader

[![version](https://img.shields.io/npm/v/@extendscript/ind.util.menuloader.svg)](https://www.npmjs.org/package/@extendscript/ind.util.menuloader)

> InDesign Utility

A tool to load InDesign menus.

## Install

```

    npm install @extendscript/ind.util.menuloader

```

## Use

### 1. Include

```

    #include 'node_modules/@extendscript/ind.util.menuloader/menuloader.js'

```

### 2. Load

```javascript

    // Load the module by creating a reference.
    var Menuloader = Sky.getUtil("menuloader")

```

### 3. Define menu

**Options**

  * __path__ (`Array`, Optional)
    - Path to main menu, leave `undefined` for InDesign's main menu
  * __sub__ (`Array`, Optional)
    - The template's submenu. (`menuItem`s)
  * __loc__ (`LocationOptions`, Optional)
    - Location option for `path` or `ref` below.
  * __ref__ (`menuItem`, Optional)
    - A reference menu item (Defaults to `lastItem()`)
  * __fun__ (`Function`, Optional)
    - The action for main menu (`path`). Used when `sub` is `undefined`

```javascript

    // Load the template with the options defined
    var myMenu = new Menuloader.template( menuName, Options );

```

If you can define the `sub` menu in your options or use the templates build in functions.

  * __addElement__ (Param `elementTemplate`)
    - Add element to `sub` menu
  * __createItem__ (Param `caption`, `fun`, `subName`)
    - Creates an `elementTemplate` for type `menuItem`
  * __createSeparator__ (Param `subName`, Optional)
    - Creates an `elementTemplate` for type `menuSeparator`

```javascript

myMenu.addElement( myMenu.createSeparator() )

```

### 3. Load

```javascript

    // Load the menu into InDesign's Main menu
    myMenu.load();

```

#### Unloading

    To remove your menu call `myMenu.unload()` 

If you lost the reference to your original template you can unload the menu by creating a new template (You don't need to define the sub menu's) just the name and path to menu:

```javascript

    var unloadMenu = new MenuLoader.template("My Menu", {path: "File"});
    MenuLoader.unload(unloadMenu);

```

Note that if you have the reference to the loaded menu you can also call unloadElement which will unload any menuElement it is given:

```javascript

    Menuloader.unloadElement(menuElement)

```

## Test

We can test the code against a range of [targets](https://github.com/nbqx/fakestk/blob/master/resources/versions.json):

    npm run test myTarget

We keep [a log of test results](./test/results_log.md)


## More info

Read [the docs](../docs/README.md)
