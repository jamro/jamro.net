casper.test.begin('The page is loaded', function suite(test) {
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
