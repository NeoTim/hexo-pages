'use strict';

var path = require('path');
var fs = require('fs');
var ncp = require('ncp');
var rimraf = require('rimraf');

hexo.on('generateAfter', function () {
  var source = path.join(process.cwd(), 'pages');
  var destination = path.join(process.cwd(), 'public');

  fs.readdir(source, function (err, files) {
    var fullPaths = files.map(function (item) {
      return path.join(destination, item);
    });

    fullPaths.forEach(function (item) {
      rimraf.sync(item);
    });

    ncp(source, destination, function (err) {
      if (err) {
        throw new Error(err);
      }

      console.log('Pages generated');
    });
  });

});
