
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var less = require('gulp-less');
var path = require('path');
var findRoot = require('find-root');

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

   var bsModule;

   try {
     bsModule = require.resolve("bootstrap");
   } catch(err) {
     throw new Error("Bootstrap module was not found, please install it using: npm i bootstrap --save");
   }
   
   const BOOTSTRAP_ROOT = path.resolve("bootstrap/less",findRoot(bsModule));
   const BOOTSTRAP_LESS_PATH = BOOTSTRAP_ROOT+"/less";
   var basePaths = [BOOTSTRAP_LESS_PATH];

   var srcPaths = basePaths.concat(options.srcPaths);

   var sources = [path.normalize(__dirname+"/less/skin.base.less"),options.skinSrc];

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
