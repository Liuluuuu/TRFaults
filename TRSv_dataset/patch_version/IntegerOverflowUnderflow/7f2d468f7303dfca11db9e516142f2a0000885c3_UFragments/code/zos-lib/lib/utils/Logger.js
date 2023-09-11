'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaults = {
  verbose: false,
  silent: true
};

class Logger {
  static silent(value) {
    defaults.silent = value;
  }

  static verbose(value) {
    defaults.verbose = value;
  }

  constructor(prefix, opts) {
    this.prefix = prefix;
    this._opts = opts;
  }

  info(msg) {
    this.log(msg, 'green');
  }

  warn(msg) {
    this.log(msg, 'yellow');
  }

  error(msg) {
    this.log(msg, 'red');
  }

  log(msg, color) {
    if (this.opts.silent) {
      return;
    }
    if (this.opts.verbose) msg = `[${this.prefix}] ${msg}`;
    console.error(_chalk2.default.keyword(color)(msg));
  }

  get opts() {
    return Object.assign({}, this._opts, defaults);
  }
}
exports.default = Logger;