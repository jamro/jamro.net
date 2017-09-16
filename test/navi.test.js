casper.options.viewportSize = {width: 1280, height: 1024};

casper.test.begin('Navigation links work', function suite(test) {
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
  casper.wait(1000);
  casper.then(function() {
    test.assertElementCount('nav li.nav-item a.nav-link', 4, "There is 4 links in the navbar");
    test.assertSelectorHasText('nav li.nav-item:nth-of-type(1) a.nav-link', "Summary", '1st link is the Summary')
    test.assertSelectorHasText('nav li.nav-item:nth-of-type(2) a.nav-link', "Cert", '2nd link is the Certs')
    test.assertSelectorHasText('nav li.nav-item:nth-of-type(3) a.nav-link', "Career", '3rd link is the Career')
    test.assertSelectorHasText('nav li.nav-item:nth-of-type(4) a.nav-link', "Skills", '4th link is the Skills')
  });
  casper.then(function() {
    test.info("Clicking Summary link");
    casper.thenClick('nav li.nav-item:nth-of-type(1) a.nav-link');
  })
  casper.then(function() {
    test.assertUrlMatch(/#summary-section/, 'Summary link works');
    test.assertExists('nav li.nav-item:nth-of-type(1) a.active', 'Summary link is active');
    test.assertElementCount('nav li.nav-item a.active', 1, 'Only one link is active');
  })
  casper.then(function() {
    test.info("Clicking Certs link");
    casper.thenClick('nav li.nav-item:nth-of-type(2) a.nav-link');
  })
  casper.then(function() {
    test.assertUrlMatch(/#certs-section/, 'Certs link works');
    test.assertExists('nav li.nav-item:nth-of-type(2) a.active', 'Certs link is active');
    test.assertElementCount('nav li.nav-item a.active', 1, 'Only one link is active');
  })
  casper.then(function() {
    test.info("Clicking Career link");
    casper.thenClick('nav li.nav-item:nth-of-type(3) a.nav-link');
  })
  casper.then(function() {
    test.assertUrlMatch(/#career-section/, 'Career link works');
    test.assertExists('nav li.nav-item:nth-of-type(3) a.active', 'Career link is active');
    test.assertElementCount('nav li.nav-item a.active', 1, 'Only one link is active');
  })
  casper.then(function() {
    test.info("Clicking Skills link");
    casper.thenClick('nav li.nav-item:nth-of-type(4) a.nav-link');
  })
  casper.then(function() {
    test.assertUrlMatch(/#skills-section/, 'Skills link works');
    test.assertExists('nav li.nav-item:nth-of-type(4) a.active', 'Skills link is active');
    test.assertElementCount('nav li.nav-item a.active', 1, 'Only one link is active');
  })
  casper.run(function() {
    test.done();
  });
});
