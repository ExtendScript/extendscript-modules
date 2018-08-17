# ExtendScript Modules

Here you can find some [modules](./docs/API-Registry.md) we host inside our [@extendscript](https://www.npmjs.com/org/extendscript) namespace on [npm](https://www.npmjs.com). These modules create a [dry](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) package environment targeting the ExtendScript environment. Giving the flexibility to pick and choose implemetations and share reusable code.

## Installing modules

We only use npm to manage packages and versions. This means that after we install a peer we still need to finish it's installation by including it's main:

    #include 'node_modules/@extendscript/modules.init/init.js'
    #include 'node_modules/@extendscript/another.module/module.js'

The order of subsequent installs does generally not matter. Just add them _after_ the only required module [modules.init](https://github.com/ExtendScript/extendscript-modules/tree/master/init).

> There is a warning if a peer is not installed but there is no warning for missing includes.

## Contributing

Any contribution is very welcome and much appreaciated. Please read our [Code of Conduct](https://github.com/ExtendScript/organisation-rules/blob/master/CODE_OF_CONDUCT.md) and [Contributing Guidelines](https://github.com/ExtendScript/organisation-rules/blob/master/CONTRIBUTING.md) before you get started. Thanks!


## More info

Read [the docs](./docs/README.md)
