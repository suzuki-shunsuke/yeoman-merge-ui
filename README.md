# yeoman-merge-ui

[![Build Status](https://travis-ci.org/suzuki-shunsuke/yeoman-merge-ui.svg?branch=master)](https://travis-ci.org/suzuki-shunsuke/yeoman-merge-ui)

yeoman custom ui to resolve conflict.

This module provides some custom yeoman components.

* Adapter
* Conflicter
* Logger

When the conflict has occured, this module provides the custom action `merge(m)`, and by default you can resolve the conflict with `vimdiff`.

For example,

```
$ yo merge-foo
 conflict foo.txt
? Overwrite foo.txt? (ynaxdmH) m
>> merge the old and the new with mergetool
```

```
$ yo merge-foo
 conflict foo.txt
? Overwrite foo.txt? merge the old and the new with mergetool
2 files to edit
    merge foo.txt
```

## Install

```
$ npm install --save yeoman-merge-ui
```

## Usage

Define your custom yeoman Generator.

```javascript
const Generator = require('yeoman-generator');
const { Conflicter, Adapter } = require('yeoman-merge-ui');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.env.adapter = new Adapter();
    this.conflicter = new Conflicter(this.env.adapter, this.options.force);
  }
}
```

## License

[BSD 2 Clause](LICENSE)
