/****************************************************************************/
/* csslint-reporter | author: Santiago Rebella                              */
/* based on gulp-csslint-sourcemap-reporter index.js                        */
/****************************************************************************/
(function () {
  "use strict";

  var path = require('path'),
      gutil = require('gulp-util'),
      c = gutil.colors,
      SourceMapConsumer = require('source-map').SourceMapConsumer;

  function sourcemapReporter (file) {
    var errorCount = file.csslint.errorCount,
        plural = errorCount === 1 ? '' : 's';

    gutil.log(c.magenta.bold.underline('Csslint Report'));

    file.csslint.results.forEach(function (result) {
      var message = result.error,
        sourceMapConsumer, originalPos, lineNum, colNum, msgInfo, locInfo;

      if (file.sourceMap !== 'undefined') {
        sourceMapConsumer = new SourceMapConsumer(file.sourceMap);
        originalPos = sourceMapConsumer.originalPositionFor({
          line: message.line,
          column: message.col
        });
        lineNum = originalPos.line;
        colNum = originalPos.column;
      } else {
        lineNum = message.line;
        colNum = message.col;
      }

      if (originalPos.source) {

        locInfo = c.gray('file ') + c.magenta.underline(path.relative(process.cwd(), originalPos.source));
        if (message.line !== undefined) {
          locInfo += c.gray(' line ') + c.yellow(lineNum) + c.gray(' column ') + c.yellow(colNum);
        } else {
          locInfo += c.yellow('GENERAL');
        }

        gutil.log(c.dim.yellow(message.message) + ' ' + c.gray(message.rule.desc));
        gutil.log(locInfo + ' ' + c.gray('csslint option ' + c.green.dim(message.rule.id)));

      } else {
        gutil.log(c.bold.yellow(result.error.message));
        gutil.log(c.red("GENERAL") + '    ' + c.yellow.bold.underline(c.green.dim(message.rule.id)));
      }

    });
    gutil.log(
      c.bold.underline.magenta('End of the CSSLINT REPORT') + ' >>>>> ' +
      c.yellow(errorCount) +
      c.gray.bold(' warning' + plural + ' found in ') +
      c.underline.magenta(file.path.split('src')[1])
    );
  }

  module.exports = sourcemapReporter;

}());