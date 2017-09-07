import browserSync from 'browser-sync';

module.exports = ((gulp, config, plugins) => {
  gulp.task('reload', ['build'], function (done) {
    browserSync.reload();
    done();
  });
  return () => {
    browserSync.init({
      server: {
        baseDir: config.tmp + "dist/"
      }
    });
    gulp.watch(config.app + "**/*", ['reload'])
  }
});
