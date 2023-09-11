'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Package = require('./Package');

var _Package2 = _interopRequireDefault(_Package);

var _Contracts = require('../utils/Contracts');

var _Contracts2 = _interopRequireDefault(_Contracts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PackageProvider {
  constructor(txParams = {}) {
    this.txParams = txParams;
  }

  from(address) {
    this._fetchPackage(address);
    return new _Package2.default(this.package, this.txParams);
  }

  _fetchPackage(address) {
    const Package = _Contracts2.default.getFromLib('Package');
    this.package = new Package(address);
  }
}
exports.default = PackageProvider;