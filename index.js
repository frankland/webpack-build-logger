'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _counter = Symbol('counter');

var WebpackLogPlugin = (function () {
  function WebpackLogPlugin(emit) {
    _classCallCheck(this, WebpackLogPlugin);

    this.emit = emit;
    this[_counter] = 1;
  }

  _createClass(WebpackLogPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('done', function (stats) {
        var counter = _this[_counter]++;

        var time = (stats.endTime - stats.startTime) / 1000;
        var scripts = stats.compilation.fileDependencies;

        var warnings = stats.compilation.warnings;
        var errors = stats.compilation.errors;

        if (Array.isArray(errors) && errors.length) {
          _this.emit('build.error', { errors: errors });
        } else {
          _this.emit('build.end', {
            counter: counter,
            time: time,
            scripts: scripts,
            warnings: warnings
          });
        }
      });

      compiler.plugin('invalid', function () {
        _this.emit('build.start');
      });
    }
  }]);

  return WebpackLogPlugin;
})();

exports['default'] = WebpackLogPlugin;
module.exports = exports['default'];