'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.read = read;
exports.readDir = readDir;
exports.exists = exists;
exports.createDir = createDir;
exports.isDir = isDir;
exports.ifExistsThrow = ifExistsThrow;
exports.ifNotExistsThrow = ifNotExistsThrow;
exports.parseJson = parseJson;
exports.parseJsonIfExists = parseJsonIfExists;
exports.editJson = editJson;
exports.writeJson = writeJson;
exports.write = write;
exports.append = append;
exports.copy = copy;
exports.remove = remove;
exports.removeDir = removeDir;
exports.removeTree = removeTree;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function read(filename) {
  return _fs2.default.readFileSync(filename);
}

function readDir(dir) {
  return _fs2.default.readdirSync(dir);
}

function exists(filename) {
  return _fs2.default.existsSync(filename);
}

function createDir(dir) {
  _fs2.default.mkdirSync(dir);
}

function isDir(path) {
  return _fs2.default.lstatSync(path).isDirectory();
}

function ifExistsThrow(filename, message) {
  if (exists(filename)) throw Error(message);
}

function ifNotExistsThrow(filename, message) {
  if (!exists(filename)) throw Error(message);
}

function parseJson(filename) {
  return JSON.parse(read(filename));
}

function parseJsonIfExists(filename) {
  if (exists(filename)) {
    return JSON.parse(read(filename));
  }
}

function editJson(file, edit) {
  const data = this.parseJson(file);
  edit(data);
  this.writeJson(file, data);
}

function writeJson(filename, data) {
  const json = JSON.stringify(data, null, 2);
  write(filename, json);
}

function write(filename, data) {
  _fs2.default.writeFileSync(filename, data);
}

function append(filename, data) {
  _fs2.default.appendFileSync(filename, data);
}

function copy(source, target) {
  _fs2.default.copyFileSync(source, target);
}

function remove(filename) {
  _fs2.default.unlinkSync(filename);
}

function removeDir(dir) {
  _fs2.default.rmdirSync(dir);
}

/**
 * Remove directory recursively
 * @param {string} dirPath
 * @see https://stackoverflow.com/a/42505874/3027390
 */
function removeTree(dirPath) {
  if (exists(dirPath)) {
    readDir(dirPath).forEach(entry => {
      const entryPath = _path2.default.join(dirPath, entry);
      isDir(entryPath) ? removeTree(entryPath) : remove(entryPath);
    });
    removeDir(dirPath);
  }
}

exports.default = {
  read,
  readDir,
  isDir,
  exists,
  ifExistsThrow,
  ifNotExistsThrow,
  parseJson,
  createDir,
  editJson,
  parseJsonIfExists,
  writeJson,
  write,
  append,
  copy,
  remove,
  removeDir,
  removeTree
};