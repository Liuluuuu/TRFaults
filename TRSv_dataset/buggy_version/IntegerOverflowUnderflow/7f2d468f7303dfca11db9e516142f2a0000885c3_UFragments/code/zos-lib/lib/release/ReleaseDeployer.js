'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Release = require('./Release');

var _Release2 = _interopRequireDefault(_Release);

var _Logger = require('../utils/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Contracts = require('../utils/Contracts');

var _Contracts2 = _interopRequireDefault(_Contracts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = new _Logger2.default('ReleaseDeployer');

class ReleaseDeployer {
  constructor(txParams = {}) {
    this.txParams = txParams;
  }

  async deployLocal(contracts) {
    await this.deployRelease();
    const deployMethod = async contractName => this._deployLocalContract(contractName);
    await this.deployAndRegisterContracts(contracts, deployMethod);
    return new _Release2.default(this.release, this.txParams);
  }

  async deployDependency(dependencyName, contracts) {
    await this.deployRelease();
    const deployMethod = async contractName => this._deployDependencyContract(dependencyName, contractName);
    await this.deployAndRegisterContracts(contracts, deployMethod);
    return new _Release2.default(this.release, this.txParams);
  }

  async deployRelease() {
    log.info("Deploying a new Release...");
    const Release = _Contracts2.default.getFromLib('Release');
    this.release = await Release.new(this.txParams);
    log.info(`Deployed at ${this.release.address}`);
  }

  async deployAndRegisterContracts(contracts, deployMethod) {
    await Promise.all(contracts.map(async contract => {
      const { alias: contractAlias, name: contractName } = contract;
      const implementation = await deployMethod(contractName);
      log.info('Registering implementation in release...');
      await this.release.setImplementation(contractAlias, implementation.address, this.txParams);
    }));
  }

  async _deployLocalContract(contractName) {
    const contractClass = _Contracts2.default.getFromLib(contractName);
    log.info(`Deploying new ${contractName}...`);
    const implementation = await contractClass.new();
    log.info(`Deployed ${contractName} ${implementation.address}`);
    return implementation;
  }

  async _deployDependencyContract(dependencyName, contractName) {
    const contractClass = await _Contracts2.default.getFromNodeModules(dependencyName, contractName);
    log.info(`Deploying new ${contractName} from dependency ${dependencyName}...`);
    const implementation = await contractClass.new();
    log.info(`Deployed ${contractName} ${implementation.address}`);
    return implementation;
  }
}
exports.default = ReleaseDeployer;