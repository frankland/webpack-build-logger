# Webpack build logger


## Add events "build.start"

## Add events "build.done"

Arguments
  - `counter` current rebuild number
  - `time` time in seconds that spent for rebuilding
  - `scripts` all modules that are included in current build
  - `warnings` array of warnings


## Add events "build.error"

Arguments
  - `errors` array of errors


## Install

`npm install --save webpack-build-logger`


## Setup
By default - plugin provide only event emmiting but auto logging could be configured.

```js
import WebpackBuildLogger form 'webpack-build-logger'

let webpackBuildLogger = new WebpackBuildLogger({
  logEnabled: true, // false - default
  logger: (counter, time, scripts, warnings) => { // by default - console.log will be used
    customLogger(counter, time, scripts, warnings)
  }
});
```

## How to use

```js
import WebpackBuildLogger form 'webpack-build-logger'

...
webpack.config.plugins.push(new WebpackBuildLogger());
...

let instance = Webpack(config);

instance.on('build.start', () => {
  ...
});

instance.on('build.done', (counter, time, scripts, warnings) => {

});

instance.on('build.error', (errors) => {
  ...
});
```
