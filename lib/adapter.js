'use strict';
const execSync = require('child_process').execSync;
const writeFileSync = require('fs').writeFileSync;

const tmp = require('tmp');
const TerminalAdapter = require('yeoman-environment/lib/adapter');

const logger = require('./log');

class Adapter extends TerminalAdapter {
  constructor(opts) {
    super();
    this._mergeOptions = opts || {};
  }
  updateMergeOptions(opts) {
    Object.assign(this._mergeOptions, opts);
  }
  merge(contents, filename) {
    const tmpObj = tmp.fileSync();
    writeFileSync(tmpObj.name, contents);
    const command = this._mergeOptions.command;
    let cmds = '';
    if (typeof command === 'function') {
      cmds = command(filename, tmpObj.name);
    } else if (command) {
      cmds = command.replace('${dest}', filename).replace('${src}', tmpObj.name);
    } else {
      cmds = `vimdiff ${filename} ${tmpObj.name} -c "wincmd l" -c "se ro" -c "wincmd h"`;
    }
    execSync(cmds, {stdio: 'inherit'});
    tmpObj.removeCallback();
  }
}

Adapter.prototype.log = logger({
  colors: {
    skip: 'yellow',
    force: 'yellow',
    create: 'green',
    merge: 'green',
    invoke: 'bold',
    conflict: 'red',
    identical: 'cyan',
    info: 'gray'
}});
module.exports = Adapter;
