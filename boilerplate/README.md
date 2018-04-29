# Boilerplate Module

This is a boilerplate module for publushing into the [@extendscript](https://www.npmjs.com/org/extendscript) namespace. Please make sure you have read our [Code of Conduct](), [Contributing Guidelines]() and [Package Naming Conventions](). Then publish to npm using the `--access public` flag:

    npm publish --access public

If your not a member of the [@extendscript](https://www.npmjs.com/org/extendscript) group, you can [request access](https://github.com/ExtendScript/AMA/issues) or create a pull-request.

# Placeholders

**\<name\>**: The name of the module as registered in the [API Registry](../docs/API-Registry.md)

**\<path\>**: The path to the module as registered in the [API Registry](../docs/API-Registry.md) (This excludes the name of module).

**\<type\>**: The type of module. Generally related to where it resides in the repo, but it is recomended to use a more semanticial value. For example a polyfill could have the type `patch`, but `shim` would be better as it is more specific to what kind of patch it is, `ES5 Shim` would be best.

**\<description\>**: The description of the module. Should be automatically updated from description in `package.json` but can be replaced at once.

> __A note on global changes__: Make sure you exclude the node-modules folder in your queries and don't forget that you might need to escape some characters when piping to Markdown. There are several `markdown-escape` tools that can help you with that.

## More info

Read [the docs](../docs/README.md)