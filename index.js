'use strict';

var path = require('path');
var fs = require('fs');
var ncp = require('ncp');
var rimraf = require('rimraf');

// hexo.on('deployBefore', function () {
hexo.on('generateAfter', function() {
  var source = path.join(process.cwd(), 'pages');
  var destination = path.join(process.cwd(), 'public');

  if(!fsExistsSync(source)) {
    throw new Error('pages dir not found');
  }

  if(!fsExistsSync(destination)) {
    fs.mkdirSync(destination);
  }

  fs.readdir(source, function(err, files) {
    var fullPaths = files.map(function(item) {
      return path.join(destination, item);
    });

    fullPaths.forEach(function(item) {
      rimraf.sync(item);
    });

    ncp(source, destination, function(err) {
      if (err) {
        throw new Error(err);
      }

      console.log('Pages generated');
    });
  });

});

function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}
