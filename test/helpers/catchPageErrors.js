module.exports = (function() {
  function catchPageErrors(casper, test) {
    casper.on("page.error", function(msg, trace) {
      trace = trace.reduce(function(msg, point) {
        if(point.file) {
          point = point.file + ":" + point.line + " [in " + point.function + "()]"
        }
        return msg + JSON.stringify(point, null, 2) + "\n";
      }, "");
      test.fail("Page Error: " + msg + "\n" + trace, "ERROR");
    });
  }
  return catchPageErrors;
})();
