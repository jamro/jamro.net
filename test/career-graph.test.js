var helper = require('./helpers/helper.js');
var config = require('./config/config.js');
helper.setup(casper);

casper.test.begin('Career graph links works', function suite(test) {
  helper.catchPageErrors(casper, test);
  casper.start(config.url);
  casper.waitWhileVisible('#preloader');
  casper.then(function() {
    var links = casper.getElementsAttribute('.career-graph a', 'href');
    links = links.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
    test.assert(links.length > 10, "There are more than 10 unique links (actual count: " + links.length + ")");
    for(var i in links) {
      test.assertExists(links[i], "There is a link for " + links[i]);
    }
  });
  casper.run(function() {
    test.done();
  });
});
