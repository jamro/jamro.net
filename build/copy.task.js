import through from 'through2';
import replace from 'buffer-replace';

module.exports = ((gulp, config, plugins) => {
  return () => {
    return gulp.src(config.tmp + "dist/**/*.*")
      .pipe(through.obj((chunk, enc, cb) => {
        if(!config.ga) {
          return cb("ERROR: No Google Analytics code in configuration file. Update build/config.js file.");
        }
        chunk.contents = replace(chunk.contents, '{{GA:XX-XXXXXXXXX-X}}', config.ga);
        cb(null, chunk);
      }))
      .pipe(gulp.dest(config.dist));
  }
});
