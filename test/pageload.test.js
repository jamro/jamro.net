casper.test.begin('The page is loaded', function suite(test) {
  casper.on("page.error", function(msg, trace) {
    trace = trace.reduce(function(msg, point) {
      if(point.file) {
        point = point.file + ":" + point.line + " [in " + point.function + "()]"
      }
      return msg + JSON.stringify(point, null, 2) + "\n";
    }, "");
    test.fail("Page Error: " + msg + "\n" + trace, "ERROR");
  });
  casper.start("http://localhost:3001/", function() {
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
