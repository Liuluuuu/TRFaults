'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encodeCall;

var _ethereumjsAbi = require('ethereumjs-abi');

var _ethereumjsAbi2 = _interopRequireDefault(_ethereumjsAbi);

var _bignumber = require('bignumber.js');

var _bignumber2 = _interopRequireDefault(_bignumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatValue(value) {
  if (typeof value === 'number' || _bignumber2.default.isBigNumber(value)) {
    return value.toString();
  } else {
    return value;
  }
}

function encodeCall(name, args = [], rawValues = []) {
  const values = rawValues.map(formatValue);
  const methodId = _ethereumjsAbi2.default.methodID(name, args).toString('hex');
  const params = _ethereumjsAbi2.default.rawEncode(args, values).toString('hex');
  return '0x' + methodId + params;
}