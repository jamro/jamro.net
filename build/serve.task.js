import browserSync from 'browser-sync';

module.exports = ((gulp, config, plugins) => {
  gulp.task('reload', ['prebuild'], function (done) {
    browserSync.reload();
    done();
  });
  return () => {
    browserSync.init({
      server: {
        baseDir: config.tmp + "dist/"
      },
      port: 8000,
      ui: false
    });
    gulp.watch(config.app + "**/*", ['reload'])
  }
});
