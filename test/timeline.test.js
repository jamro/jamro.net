casper.options.viewportSize = {width: 1280, height: 1024};

casper.test.begin('Timeline entries works', function suite(test) {
  casper.start("http://localhost:3001/");
  casper.waitWhileVisible('#preloader');
  casper.then(function() {
    var entries = casper.getElementsAttribute('.timeline > li', 'class').length;
    test.assert(entries > 10, "There are more than 10 timeline entries (actual count: " + entries + ")");
    var organizationLinks = [];
    for(var index=1; index <= entries; index++) {
      var css = '.timeline > li:nth-of-type(' + index + ') ';
      var title = casper.getElementInfo(css + '.timeline-title').text;
      var organization = casper.getElementInfo(css + '.organization').text;
      var organizationLink = casper.getElementAttribute(css + 'a.organization', 'href');
      test.assert(title.length > 0, "Title exists (" + title + ")");
      test.assert(organization.length > 0, "Organization info exists");
      if(organizationLink) {
        organizationLinks.push(organizationLink);
      }
    }
    organizationLinks = organizationLinks.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
    test.assert(organizationLinks.length > 3, "There are more than 3 unique organization links (actual count: " + organizationLinks.length + ")");
  });
  casper.run(function() {
    test.done();
  });
});
