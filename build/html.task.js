module.exports = ((gulp, config, plugins) => {
  return () => {
    return gulp.src(config.html)
      .pipe(gulp.dest(config.tmp + "dist/"));
  }
});
