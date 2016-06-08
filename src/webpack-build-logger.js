import BaseEvents from 'base-events';
import chalk from 'chalk';

const _counter = Symbol('counter');
const _options = Symbol('options');

const logError = (log, {
  counter,
  time,
  scripts,
  warnings,
  errors
}) => {
  for (const err of errors) {
    log(err.message);
  }
};

const logDone = (log, {
  counter,
  time,
  scripts,
  warnings
}) => {
  const colorize = chalk.green;

  let message = `${colorize('#' + counter)} application was packed. Elapsed time ${colorize(time + 's')}. `;
  message += `Number of scripts ${colorize(scripts.length)}`;

  log(message);

  if (warnings && !!warnings.length) {
    const warningColorize = chalk.cyan;

    log('------------------');
    log(warningColorize('*** WARNINGS ***'));
    for (var warning of warnings) {
      log(`at ${warningColorize(warning.module.issuer)}`);
      log(`requested "${warningColorize(warning.module.rawRequest)}" ("${warningColorize(warning.module.userRequest)}")`);
      log(warning.message.replace(/(\r\n|\n|\r)/gm, ' '));
    }

    log('------------------');
  }
};

export default class WebpackLogPlugin extends BaseEvents {
  constructor(options) {
    super();
    this[_options] = options;
    this[_counter] = 1;
  }

  apply(compiler) {
    compiler.plugin('done', (stats) => {
      const counter = this[_counter]++;

      const time =  (stats.endTime - stats.startTime) / 1000;
      const scripts = stats.compilation.fileDependencies;

      const warnings = stats.compilation.warnings;
      const errors = stats.compilation.errors;

      const log = this[_options].log || console.log;

      if (Array.isArray(errors) && errors.length) {
        this.emit('build.error', { errors });

        if (this[_options].logEnabled) {
          logError(log, {
            counter,
            time,
            scripts,
            warnings,
            errors
          });
        }
      } else {
        this.emit('build.done', {
          counter,
          time,
          scripts,
          warnings
        });

        if (this[_options].logEnabled) {
          logDone(log, {
            counter,
            time,
            scripts,
            warnings
          });
        }
      }
    });

    compiler.plugin('invalid', () => {
      this.emit('build.start');

      if (this[_options].logEnabled) {
        const colorize = chalk.green;
        const log = this[_options].log || console.log;

        log(colorize('rebuild application'));
      }
    });
  }
}
