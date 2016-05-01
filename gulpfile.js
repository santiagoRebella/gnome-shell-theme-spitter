(function () {
  "use strict";
  
  var theme =  { name: "realsass", user: "san" },
      options = {
        config: {
          name: theme.name,
          user: theme.user,
          refreshCmd: "gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell --method org.gnome.Shell.Eval 'Main.loadTheme();'",
          locPath: '/home/' + theme.user + '/.themes/' + theme.name + '/gnome-shell/'
        },
        csslint: { 
          'zero-units': false,
          'shorthand': false,
          'known-properties': false,
          'adjoining-classes': false,
          'compatible-vendor-prefixes': false,
          'fallback-colors': false,
          'duplicate-background-images': false,
          'ids': false,
          'overqualified-elements': false,
          'box-model': false,
          'important': false,
          'font-sizes': false
        }
      },
      gulp = require('gulp'),
      del = require('del'),
      gp = require('gulp-load-plugins')(),
      csslintReporter =  require('./csslint-reporter');

  gulp.task('sass', function () {
    del.sync(['./dist/gnome-shell.css'], { force: true });
    return gulp.src('./src/theme-manifest.scss')
      .pipe(gp.sourcemaps.init())
      .pipe(gp.sass({ outputStyle: 'compressed', 'debug_info': true }))
        .on('error', gp.sass.logError)
      .pipe(gp.rename("gnome-shell.css"))
      .pipe(gp.csslint(options.csslint))
      .pipe(gp.csslint.reporter(csslintReporter))
      .pipe(gulp.dest('./dist'));
  });  
   
  gulp.task('deploy', ['sass'], function () {
    del.sync([options.config.locPath + 'gnome-shell.css'], { force: true });
    return gulp.src('./dist/*')
      .pipe(gulp.dest(options.config.locPath))
      .pipe(gp.shell([ options.config.refreshCmd ]));
  });
  
  gulp.task('deploy-assets', function () {
    del.sync(['./dist/*'], { force: true });
    gulp.src('./src/assets/*')
      .pipe(gulp.dest('./dist'))
      .pipe(gp.shell([ options.config.refreshCmd ]));

  });
    
  gulp.task('watch', function () {
    return gulp.watch('./src/**', ['deploy']);
  });

  /****************************************************************************/
  /* TASKS DEFINITION                                                         */
  /****************************************************************************/
  gulp.task('default', ['deploy', 'watch']);
  gulp.task('pack', ['deploy-assets', 'sass']);

}());