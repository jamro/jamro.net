var helper = require('./helpers/helper.js');
var config = require('./config/config.js');
helper.setup(casper);

casper.test.begin('The page is loaded', function suite(test) {
  helper.catchPageErrors(casper, test);
  casper.start(config.url, function() {
    test.assertTitle("Krzysztof Jamróz: about me", "Homepage title is the one expected");
  });
  casper.waitWhileVisible('#preloader');
  casper.then(function() {
    test.assertTextExists("Krzysztof Jamróz", "My name is on the page");
  })

  casper.run(function() {
    test.done();
  });
});
