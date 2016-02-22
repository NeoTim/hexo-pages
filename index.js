'use strict';

var rimraf = require('rimraf');
var fs = require('fs-extra');
var path = require('path');

hexo.on('generateBefore', function () {
  var source = path.join(process.cwd(), 'pages');
  var destination = path.join(process.cwd(), 'public');

  try {
    rimraf.sync(destination);
    fs.copySync(source, destination);
    console.log('Pages generated');
  } catch (err) {
    throw new Error(err);
  }

});
