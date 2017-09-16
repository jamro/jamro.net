var helper = require('./helpers/helper.js');
var config = require('./config/config.js');
helper.setup(casper);

casper.test.begin('Strengths details works', function suite(test) {
  helper.catchPageErrors(casper, test);
  casper.start(config.url);
  casper.waitWhileVisible('#preloader');
  var buttons = [];
  casper.then(function() {
    var strengths = casper.getElementsAttribute('.strengths .strength-item', 'class').length;
    test.assert(strengths > 5, "There are more than 5 strengths (actual count: " + strengths + ")");
    for(var index = 1; index <= strengths; index++) {
      var css = '.strengths .strength-item:nth-of-type(' + index + ') ';
      var title = casper.getElementInfo(css + 'h3').text;
      test.assert(title.length > 0, 'Strength title is not empty -> ' + title);
      test.assertExists(css + " button", 'Strength contains "more button"');
      test.assertNotVisible(css + "modal", "Details popup is not visible")
      buttons.push(css);
    }
    casper.eachThen(buttons, function(response) {
      var buttonCss = response.data + " button";
      var modalCss = response.data + " .modal";
      var closeCss = response.data + " .modal button.close";
      var title = casper.getElementInfo(response.data + 'h3').text.replace(/\(.*\)/, '');
      casper.then(function() {
        casper.echo("Openning details of " + title);
        casper.click(buttonCss);
      });
      casper.waitUntilVisible(modalCss);
      casper.then(function() {
        var modalTitle = casper.getElementInfo(modalCss + ' h4').text;
        test.assertEquals(modalTitle, title, "Popup title match (" + title + ")")
        var content = casper.getElementInfo(modalCss + ' .modal-body p.strength-details').text;
        test.assert(content.length > 50, 'Description length: ' + content.length);
      });
      casper.then(function() {
        casper.echo("Closing details of " + title);
        casper.click(closeCss);
      });
      casper.waitWhileVisible(modalCss);
    })
  });

  casper.run(function() {
    test.done();
  });
});
