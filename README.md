# Gulp boilerplate - Browserify, Babel (ES6, JSX) and Sass

## Installation

```
$ mkdir <project-name>
$ wget -qO- https://github.com/ByScripts/gulp-boilerplate/archive/0.2.3.tar.gz | tar xvz --strip-components=1 -C <project-name>
$ cd <project-name>
$ npm install
$ gulp --watch
```

## Usage

### Task: static

`gulp static` will copy everything from `src/dist` to `dist` keeping directory structure.

It's where you should store your `index.html` file for example

### Task: script

`gulp script` will compile every `src/scripts/<name>.js` files to `dist/scripts/<name>.js` through `browserify` with `babel` transformer.

You can write `ES6` and `JSX`.

A simple example would be `src/scripts/app.js` => `dist/scripts/app.js`

Here is a more complex example:

    src/scripts/
        app1/
            Component1.js
            Component2.js
        app2/
            Component3.js
            Component4.js
        common/
            Component5.js
        app1.js
        app2.js

Which would result in `dist/scripts/app1.js` and `dist/scripts/app2.js`

### Task: style

`gulp style` will compile every `src/styles/<name>.scss` to `src/styles/<name>.scss` through `sass` configured with folder `bower_components` as a resource root.

So after a `bower install bootstrap-sass`, you can `@import "bootstrap-sass/assets/stylesheets/bootstrap"`.

### Task: default

`gulp` alone will run the default task which is a combination of `static`, `style` and `script` tasks

### Task: build

`gulp build` will run the `default` task in "build mode"

In this mode, the `dist` folder will first be emptied and the output files will be minified

*It is not possible to call `build` task along any other task, nor with `--watch` flag*

### Flag: --watch

Each task can be called with a `--watch` flag (even the `default` task).

* Statics will be copied if any `src/dist/**/*` file changes.
* Styles will be updated if any `src/styles/**/*` file changes.
* Scripts listening is handled by `watchify` and will recompile if any `src/scripts/*.js` file or `require`'d file changes.
