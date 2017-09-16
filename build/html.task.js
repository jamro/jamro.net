module.exports = ((gulp, config, plugins) => {
  return () => {
    return gulp.src(config.static)
      .pipe(gulp.dest(config.tmp + "dist/"));
  }
});
