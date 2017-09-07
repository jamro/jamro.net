import browserSync from 'browser-sync';

module.exports = function (gulp, config, plugins) {
  return function () {
    browserSync.init({
      server: {
        baseDir: config.tmp + "dist/"
      },
      port: 3001,
      open: false,
      ui: false,
      online: false,
      notify: false,
      localOnly: true
    });
    return gulp.src(config.test)
      .pipe(plugins.casperjsLocal.default({
        binPath: './node_modules/.bin/casperjs'
      }))
      .on('error', function(){
        process.emit('exit');
      })
      .on('end', function () {
        browserSync.exit();
      });

  };
};
