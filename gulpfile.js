(function () {
  "use strict";
  
  var theme =  { 
        name: "antiradius-orange", 
        user: "san", 
        version: '1.0.0', 
        shell: 'GNOME Shell 3.18.4',
        email: "santiago_rebella@hotmail.com",
        url: "https://github.com/santiagoRebella",
        author: 'Santiago Rebella' 
      },
      options = {
        config: {
          name: theme.name,
          user: theme.user,
          refreshCmd: "gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell --method org.gnome.Shell.Eval 'Main.loadTheme();'",
          locPath: '/home/' + theme.user + '/.themes/' + theme.name + '/gnome-shell/'
        },
        csslint: { 
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
  
  gulp.task('pack', ['sass'], function () {
    
    gulp.src('./dist/*')
      .pipe(gp.header(
`/****************************************************************************/
/*
  Gnome-shell theme: ${theme.name} v${theme.version} 
  
  Created by ${theme.author} ${theme.email} 
  ${theme.url} 
  Copyright (C) 2016 ${theme.author}

  This file is generated from modified sass sources, do not edit.
  CSS adapted from sass sources https://git.gnome.org/browse/gnome-shell-sass/tree/ 
  
  Created and only tested under ${theme.shell}

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/  
/****************************************************************************/
`     ))
      .pipe(gulp.dest('../spits/' + theme.name + '/pkg/' + theme.name + '/gnome-shell'))
      .pipe(gp.shell([ options.config.refreshCmd ]));

  });
    
  gulp.task('watch', function () {
    return gulp.watch('./src/**', ['deploy']);
  });

  /****************************************************************************/
  /* TASKS DEFINITION                                                         */
  /****************************************************************************/
  gulp.task('default', ['deploy', 'watch']);


}());