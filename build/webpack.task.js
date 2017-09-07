import webpack from 'webpack-stream';
import getWebpackConfig from './webpack.config.js';

module.exports = ((gulp, config, plugins) => {
  return () => {
    return gulp.src(config.entry)
      .pipe(webpack(getWebpackConfig(config)))
      .pipe(gulp.dest(config.tmp + "dist/js/"));
  }
});
