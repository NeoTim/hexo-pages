'use strict';

var ncp = require('ncp').ncp;
var path = require('path');

hexo.on('generateBefore', function () {
  var source = path.join(process.cwd(), 'pages');
  var destination = path.join(process.cwd(), 'public');

  ncp(source, destination, function (err) {
    if (err) {
      throw new Error(err);
    }
  });

  console.log('Pages generated');
});
