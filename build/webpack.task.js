import webpack from 'webpack-stream';
import getWebpackConfig from './webpack.config.js';

module.exports = ((gulp, config, plugins) => {
  return () => {
    return gulp.src([config.entry.app, config.entry.assets, config.entry.vendor1, config.entry.vendor2])
      .pipe(webpack(getWebpackConfig(config)))
      .pipe(gulp.dest(config.tmp + "dist/js/"));
  }
});
