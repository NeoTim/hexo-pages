'use strict';

var path = require('path');
var fs = require('fs');
var ncp = require('ncp');
var rimraf = require('rimraf');
var del = require('del');
var jetpack = require('fs-jetpack');

module.exports = function(locals) {
  var Hexo = require('hexo');
  var hexo = new Hexo(process.cwd(), {});

  // hexo.on('generateAfter', generate);
  init();

  function init() {
    var source = path.join(process.cwd(), 'pages');
    var destination = path.join(process.cwd(), 'public');

    if (!fsExistsSync(source)) {
      throw new Error('pages dir not found');
    }

    if (!fsExistsSync(destination)) {
      fs.mkdirSync(destination);
    }

    fs.readdir(source, function(err, files) {
      if (err) {
        throw new Error(err);
      }

      var fullPaths = files.map(function(item) {
        return path.join(destination, item);
      });

      try {
        fullPaths.forEach(function(item) {
          rimraf.sync(item);
        });
      } catch (err) {
        throw new Error(err);
      }

      setTimeout(function() {
        try {
          jetpack.copy(source, destination, {
          overwrite: true,
          matching: ['*.css', '*.html', '*.js', '*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']
        });
          console.log('Pages generated');
        } catch (err) {
          throw new Error(err);
        }

        // ncp(source, destination, { clobber: true }, function(err) {
        //   if (err) {
        //     throw new Error(err);
        //   }
        //
        //   console.log('Pages generated');
        // });
      }, 700);

      // del(fullPaths, { force: true, dryRun: false })
      //   .then(function() {
      //
      //   })
      //   .catch(function(err) {
      //     throw new Error(err);
      //   });

    });
  }

};

function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }

  return true;
}
