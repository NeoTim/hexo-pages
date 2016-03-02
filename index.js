var merge = require('utils-merge');

var config = hexo.config.pages = merge({
  dir: 'pages'
}, hexo.config.pages);

// Set default search path
if (!config.path) {
  config.path = 'pages';
}

hexo.extend.generator.register('pages', require('./lib/pages'));
