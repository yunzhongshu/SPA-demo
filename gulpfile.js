'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var notify = require('gulp-notify');
var del = require('del');
var flatten=require('gulp-flatten');
var jshint=require('gulp-jshint');
var rename = require("gulp-rename");
var rjs = require('requirejs');
var through = require('through2');
var modify = require('modify-filename');


var global={
    isWatch : true,　　　//true:开发中, false:生产环境

};

var deployRoot = './output/';
var watchRoot = './output-watch/';
var assetDir = 'asset/';

function getDistRoot(){
    return global.isWatch ? watchRoot : deployRoot;
}

//去除文件路径,只剩文件名, 如common/scss/common.css 改成common.css
function removeDirPath(file, env, cb){

    //file.path  绝对路径
    //file.relative 相对路径
    var index = file.path.indexOf(file.relative);

    var filename = file.relative.substring(file.relative.lastIndexOf('/'));

    file.path = file.path.substring(0, index-1) + filename;


    cb(null, file);

}


gulp.task('copyPage', function(){

    gulp.src(['*.html'])
        .pipe(gulp.dest(getDistRoot()));
});


gulp.task('clean', function(cb){
     return del([getDistRoot()+ assetDir, getDistRoot()+'*.html'], {force: true}, cb);
});

gulp.task('scripts', function(cb){

    var buildConf = require('./build.js').getConf(global.isWatch);

    rjs.optimize(buildConf, function (buildResponse) {
        console.log('build response', buildResponse);
        cb();
    });

});

gulp.task('sass', function () {
    var destDir = getDistRoot() + assetDir + 'css';

    return gulp.src(['src/**/*.scss'])
        .pipe(sass({
            sourceMap : global.isWatch ? true : false,
            outputStyle : global.isWatch ? 'compact' : 'compressed',  //nested 继承, compact 紧凑,expanded 展开,compressed 压缩
        }))
        .on('error', $.notify.onError())
        .pipe(through.obj(function(file, env, cb) {

            removeDirPath(file, env, cb);

        }))
        .pipe(gulp.dest(destDir));
});


gulp.task('copyFont', function(){

    var destDir = getDistRoot() + assetDir + 'fonts';
    return gulp.src([
        'dep/**/*.otf',
        'dep/**/*.eot',
        'dep/**/*.svg',
        'dep/**/*.ttf',
        'dep/**/*.woff',
        'dep/**/*.woff2'
        ]).pipe(through.obj(function(file, env, cb) {

            removeDirPath(file, env, cb);

        }))
        .pipe(gulp.dest(destDir));

});


gulp.task('copyTpl', function(){
    var destDir = getDistRoot() + assetDir + 'tpl';

    return gulp.src([
        'src/**/*-tpl.html'
        ]).pipe(through.obj(function(file, env, cb) {

            removeDirPath(file, env, cb);

        }))
        .pipe(gulp.dest(destDir));

});


gulp.task('watch', ['clean'], function(){

    gulp.start([
        'copyPage',
        'scripts',
        'sass',
        'copyFont',
        'copyTpl',

    ]);
});




