'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.behaviors = exports.helpers = undefined;

var _assertions = require('./helpers/assertions');

var _assertions2 = _interopRequireDefault(_assertions);

var _assertRevert = require('./helpers/assertRevert');

var _assertRevert2 = _interopRequireDefault(_assertRevert);

var _Ownable = require('./behaviors/Ownable');

var _Ownable2 = _interopRequireDefault(_Ownable);

var _ImplementationDirectory = require('./behaviors/ImplementationDirectory');

var _ImplementationDirectory2 = _interopRequireDefault(_ImplementationDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const helpers = {
  assertions: _assertions2.default,
  assertRevert: _assertRevert2.default
};

const behaviors = {
  shouldBehaveLikeOwnable: _Ownable2.default,
  shouldBehaveLikeImplementationDirectory: _ImplementationDirectory2.default
};

exports.helpers = helpers;
exports.behaviors = behaviors;