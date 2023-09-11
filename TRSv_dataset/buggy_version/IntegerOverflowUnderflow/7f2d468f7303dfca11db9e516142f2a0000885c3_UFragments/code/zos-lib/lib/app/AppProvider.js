'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Contracts = require('../utils/Contracts');

var _Contracts2 = _interopRequireDefault(_Contracts);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppProvider {
  constructor(txParams = {}) {
    this.txParams = txParams;
  }

  async from(address) {
    this._fetchPackagedApp(address);
    await this._fetchFactory();
    await this._fetchPackage();
    await this._fetchAppDirectory();
    return new _App2.default(this.packagedApp, this.factory, this.appDirectory, this.package, this.version, this.txParams);
  }

  _fetchPackagedApp(address) {
    const PackagedApp = _Contracts2.default.getFromLib('PackagedApp');
    this.packagedApp = new PackagedApp(address);
  }

  async _fetchAppDirectory() {
    const AppDirectory = _Contracts2.default.getFromLib('AppDirectory');
    this.version = await this.packagedApp.version();
    const appDirectoryAddress = await this.package.getVersion(this.version);
    this.appDirectory = new AppDirectory(appDirectoryAddress);
  }

  async _fetchPackage() {
    const Package = _Contracts2.default.getFromLib('Package');
    const packageAddress = await this.packagedApp.package();
    this.package = new Package(packageAddress);
  }

  async _fetchFactory() {
    const UpgradeabilityProxyFactory = _Contracts2.default.getFromLib('UpgradeabilityProxyFactory');
    const factoryAddress = await this.packagedApp.factory();
    this.factory = new UpgradeabilityProxyFactory(factoryAddress);
  }
}
exports.default = AppProvider;