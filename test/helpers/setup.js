module.exports = (function() {
  var config = require('../config/config.js');
  function setup(casper) {
    casper.options.viewportSize = {
      width: config.viewportWidth,
      height: config.viewportHeight
    };
  }
  return setup;
})();
