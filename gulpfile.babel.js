import gulp from 'gulp';
import config from './build/config.js';
import loadPlugins from 'gulp-load-plugins';
const plugins = loadPlugins();

config.devMode = !!plugins.util.env.dev;

if(config.devMode) {
  plugins.util.log("MODE:", plugins.util.colors.red('DEVELOPMENT'));
} else {
  plugins.util.log("MODE:", plugins.util.colors.green('PRODUCTION'));
  process.env.NODE_ENV='"production"';
}

gulp.task('clean', require('./build/clean.task.js')(gulp, config, plugins));
gulp.task('webpack', ['clean'], require('./build/webpack.task.js')(gulp, config, plugins));
gulp.task('html', ['clean'], require('./build/html.task.js')(gulp, config, plugins));
gulp.task('serve', ['webpack', 'html'], require('./build/serve.task.js')(gulp, config, plugins));
gulp.task('test', ['webpack', 'html'], require('./build/test.task.js')(gulp, config, plugins));
gulp.task('lint', require('./build/lint.task.js')(gulp, config, plugins));
gulp.task('copy', require('./build/copy.task.js')(gulp, config, plugins));

gulp.task('prebuild', ['webpack', 'html']);

gulp.task('build', ['prebuild', 'test', 'lint'], require('./build/copy.task.js')(gulp, config, plugins));

gulp.task('default', ['build']);
