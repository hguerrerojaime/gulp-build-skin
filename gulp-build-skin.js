
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var less = require('gulp-less');

// The main function for the plugin – what the user calls – should return
// a stream.
var buildSkinPlugin = function(_options) {

   var options = Object.assign({
     "outputFile": "skin.min.css",
     "srcPaths": "less",
     "compress": true,
     "skinSrc": "less/skin.less",
     "theme": "basic"
   },_options);

   const BOOTSTRAP_LESS_PATH = "node_modules/bootstrap/less";

   var basePaths = [BOOTSTRAP_LESS_PATH];

   var srcPaths = basePaths.concat(options.srcPaths);

   var sources = ["less/skin.base.less",options.skinSrc];

   return gulp.src(sources)
      .pipe(concat('skin.bundle.less'))
      .pipe(replace(/<<theme>>/,options.theme))
      .pipe(less({
          compress: options.compress,
          paths: srcPaths
      }))
      .pipe(rename(options.outputFile))
   ;
};

// Export the plugin main function
module.exports = buildSkinPlugin;
