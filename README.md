# Webpack build logger


## Add events "build.end"

Arguments
  - `counter` current rebuild number
  - `time` time in seconds that spent for rebuilding
  - `scripts` all modules that are included in current build
  - `warnings` array of warnings


## Add events "build.error"

Arguments
  - `errors` array of errors
