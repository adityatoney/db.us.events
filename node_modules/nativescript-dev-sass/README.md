SASS CSS pre-processor for NativeScript projects
=======================================

[![npm version](https://badge.fury.io/js/nativescript-dev-sass.svg)](https://badge.fury.io/js/nativescript-dev-sass)

----------
This plugin uses the [node-sass compiler](https://www.npmjs.com/package/node-sass) to transpile SCSS files to CSS files in [NativeScript](https://www.nativescript.org/) projects.

## How to use

Add the plug-in to your project:
```
$ tns install sass
```
Alternatively:
```
$ npm install nativescript-dev-sass --save-dev
```

Either of the above commands installs this module and installs the necessary NativeScript build and LiveSync hooks. SASS CSS pre-processing of all `.scss` or `.sass` files inside the `app` folder happens when the project is prepared for build (including LiveSync, Emulate and Watch commands).

After the plugin runs, it will automatically delete all `.scss` and `.sass` files from the app package (leaving only the compiled `.css`)

## LiveSync Support

This plugin will work in all versions of NativeScript to transpile SCSS and SASS files, but for LiveSync to work as expected with real-time style updates:
- NativeScript 2.5 and higher, use version 1.x and higher of this plugin (latest version)
- NativeScript 2.4.x and lower, use version 0.4.2

You can install a specific version of this plug-in using this command:
```
$ npm install nativescript-dev-sass@0.4.2 --save-dev
```

To use the latest release candidates (when available), use this command:
```
$ npm install nativescript-dev-sass@rc --save-dev
```
In NativeScript 2.4 and lower, the current version of this plug-in will cause LiveSync to trigger an app restart. The last version of this plug-in that supports real-time updates (with no app restart) in NativeScript 2.4 and lower is 0.4.2.

## Breaking Changes

v1.0.0
- `@import` statements require relative paths (previous versions built all paths relative app root)
- Importing stylesheets from `node_modules` now requires "`~`" to start the path (ex: `@import '~nativescript-theme-core'` instead of `@import 'nativescript-theme-core'`)

## SASS @import syntax

To import external stylesheets, use the standard SASS syntax:
```
@import 'variables'
```
As of v1.0.0 of this plug-in, imports use relative paths. For example, to reference an external stylesheet in the root `app` directory from a stylesheet in a sub-folder:
```
@import '../variables'

OR

@import '~/variables' // Supported in v1.1.0+
```

As of v1.0.0 of this plugin, you can also reference SASS files in the `node_modules` directory using the tilde (`~`) notation. For example, to reference a SASS stylesheet in the `nativescript-theme-core` plugin:
```
@import '~nativescript-theme-core/scss/platforms/index.ios'
```

NOTE: Do not include a forward slash after the tilde. Use `~[node_modules folder name]` and not `~/[node_modules folder name]`. The later will not resolve correctly.

### Using file extensions with @import

In some cases, the current version of node-sass requires `@import` statements to explicitly include the filename extension (like `.scss`). This occurs if files with the same name exist in the same path.

For example:
```
variables.scss
variables.css
_variables.scss
```

Node-sass will throw an error if the `@import 'variables';` syntax is used. As a workaround, use an explicit filename, like: `@import 'variables.scss';`

This is currently on the roadmap for node-sass 4.0. [See this issue for more detail](https://github.com/sass/node-sass/issues/1222).

