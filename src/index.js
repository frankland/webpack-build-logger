let _counter = Symbol('counter');

export default class WebpackLogPlugin {
  constructor(emit) {
    this.emit = emit;
    this[_counter] = 1;
  }

  apply(compiler) {
    compiler.plugin('done', (stats) => {
      let counter = this[_counter]++;

      let time =  (stats.endTime - stats.startTime) / 1000;
      let scripts = stats.compilation.fileDependencies;

      let warnings = stats.compilation.warnings;
      let errors = stats.compilation.errors;

      if (Array.isArray(errors) && errors.length) {
        this.emit('build.error', { errors });
      } else {
        this.emit('build.end', {
          counter,
          time,
          scripts,
          warnings
        });
      }
    });

    compiler.plugin('invalid', () => {
      this.emit('build.start');
    });
  }
}