module.exports = ((gulp, config, plugins) => {
  return () => {
    return gulp.src(config.tmp + "dist/**/*.*")
      .pipe(gulp.dest(config.dist));
  }
});
