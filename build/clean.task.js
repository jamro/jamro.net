module.exports = ((gulp, config, plugins) => {
  return () => {
    return gulp.src([config.tmp, config.dist])
      .pipe(plugins.clean());
  }
});
