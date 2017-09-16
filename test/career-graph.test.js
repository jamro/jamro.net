casper.options.viewportSize = {width: 1280, height: 1024};

casper.test.begin('Career graph links works', function suite(test) {
  casper.on("page.error", function(msg, trace) {
    trace = trace.reduce(function(msg, point) {
      if(point.file) {
        point = point.file + ":" + point.line + " [in " + point.function + "()]"
      }
      return msg + JSON.stringify(point, null, 2) + "\n";
    }, "");
    test.fail("Page Error: " + msg + "\n" + trace, "ERROR");
  });
  casper.start("http://localhost:3001/");
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
