var gulp = require('gulp');
var buildSkin = require('./gulp-build-skin');

gulp.task('default',() => {

    return buildSkin({
        theme:"modern"
    })
        .pipe(gulp.dest("test"));

});
