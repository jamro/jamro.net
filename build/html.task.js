module.exports = ((gulp, config, plugins) => {
  return () => {
    const htmlFilter = plugins.filter(['**/*.html'], {restore: true});
    return gulp.src(config.static)
      .pipe(htmlFilter)
      .pipe(plugins.htmlmin({
        collapseWhitespace: true,
        minifyJS: true
      }))
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest(config.tmp + "dist/"));
  }
});
