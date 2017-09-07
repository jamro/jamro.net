module.exports = function (gulp, config, plugins) {
  return function () {
    return gulp.src(config.app + '**/*.js')
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError());
  };
};
