/// <binding AfterBuild='index' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp"),
    less = require("gulp-less"),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    minifyHtml = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    print = require('gulp-print'),
    tslint = require('gulp-tslint'),
    clean = require('gulp-clean'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    rimraf = require("rimraf"),
    addStream = require('add-stream'),
    typescript = require('gulp-typescript'),
    tsProject = typescript.createProject('tsconfig.json'),
    project = require("./project.json"),
    gulpTypings = require("gulp-typings");



Config = require('./gulpfile.config');

//Load config settings object
var config = new Config(project.webroot);

gulp.task('index', ['inject-references'], function () {
    // inject needs a 'ready' file, so there is a sync dependency
    //1. Lint ts files
    //2. Generate ts path references
    //3. Cleanups
    //4. Transform less
    //5. copy less and external js
    //6. bundle scripts and html files
    //7. inject and move index.html
});

//Clean sripts from wwwroot folder
gulp.task('clean-scripts', function (cb) {
    rimraf(config.paths.dest.src, cb);
});

//Clean styles from wwwroot folder
gulp.task('clean-styles', function (cb) {
    rimraf(config.paths.dest.styles, cb);
});


gulp.task("install-typings", function () {
    gulp.src("./typings.json")
        .pipe(gulpTypings()); //will install all typingsfiles in pipeline. 
});

//Auto generate _all.ts file(it must exist) typescript definitions
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.paths.source.appTypeScriptReferences);
    var sources = gulp.src(config.paths.source.angularTsFiles, { read: false });
    return target.pipe(inject(sources, {
        ignorePath: config.paths.source.typscriptApp,
        addRootSlash: false,
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.paths.source.typscriptApp))
    .pipe(print());
});

//Lint all custom TypeScript files.
gulp.task('ts-lint', function () {



    //return gulp.src(config.paths.source.angularTsFiles)
    //    .pipe(print())
    //    .pipe(tslint())
    //    .pipe(tslint.report("prose", {
    //        summarizeFailureOutput: true
    //    }))
    //.on('error', gutil.log);
});

//Compile TS files, bundle and transfer them to wwwroot folder
gulp.task('bundle-scripts', ['ts-lint', 'gen-ts-refs', 'copy-external-css', 'copy-external-js'], function () {

    // At the moment VS has a bug with environment variables, it will be fixed soon.
    // The following code will not work properly by default(the files will minified).
    // Temp solution - set up system variable on personal machine "ASPNET_ENV":"Development"
    var tsResult = tsProject.src().pipe(gulpif(
            config.environment.isDevelopment(), //if in development
            sourcemaps.init())) //start source maps
        .pipe(typescript(tsProject))
        .pipe(print()); //compile typescript files
    return tsResult
        .pipe(addStream.obj(prepareTemplates))      //build and append html templates
        .pipe(concat('demoApp.js'))                 //bundle into demoApp.js
        .pipe(ngAnnotate())                         //Angular html templates
        .pipe(gulpif(
            !config.environment.isDevelopment(),    //if not in development
            uglify()))                              //minify
        .on('error', gutil.log)
        .pipe(gulpif(
            config.environment.isDevelopment(),     //if in development
            sourcemaps.write('./')))                //finish sources
        .pipe(gulp.dest(config.paths.dest.src))     //output to target dest
        //.pipe(print())
    ;    
});

//Inject required JS and CSS files in _Layout.cshtml
gulp.task('inject-references', ['bundle-scripts'], function () {
    //this reads the dest folder and injects each file in _layouts.cshtml
    var externals = gulp.src([
        //explicit filenames allow us to control the order in which they are added
        config.paths.dest.externalJS + 'jquery.min.js', //explicit
        config.paths.dest.externalJS + 'jquery.js', //explicit
        config.paths.dest.externalJS + 'angular.min.js', //explicit
        config.paths.dest.externalJS + 'angular.js', //explicit
        config.paths.dest.externalJS + '**/*.js',
        config.paths.dest.externalCSS + '**/*.css'
    ], { read: false });

    var domestic = gulp.src([
        config.paths.dest.src + '**/*.js',
        '!' + config.paths.dest.src + 'external/**/*.js',
        config.paths.dest.styles + 'base.css' //explicit
    ], { read: false });;

    //inject into index.html and move to wwwroot
    return gulp.src('./index.html')
        .pipe(inject(externals, { name: 'externals', ignorePath: 'wwwroot' }))
        .pipe(inject(domestic, { relative: false, ignorePath: 'wwwroot' }))
        .pipe(gulp.dest('./wwwroot/'));
});

//Watch for changes in ts and less files
gulp.task('watch', function () {
    gulp.watch([config.paths.source.angularTsFiles], ['inject-references']);
    gulp.watch([config.paths.source.angularHtmlFiles], ['inject-references']);
    gulp.watch(config.paths.source.styles, ['copy-external-css', 'transform-less']);
});

//Transform LESS files and transfer them to the wwwroot folder 
gulp.task('transform-less', ['clean-styles'], function () {
    return gulp.src(config.paths.source.baseLessFile)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .on('error', function (err) { console.log(err.message); })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.dest.styles));
});

//Copy index.html to wwwroot
//gulp.task('copy-html', function () {
//    return gulp.src('./index.html')
//    .pipe(gulp.dest('./wwwroot'));
//});

//Copy required external JS files from bower_components to wwwroot
gulp.task('copy-external-js', ['clean-scripts'], function () {

    var externalJs;
    // If in development use non-minified files
    if (config.environment.isDevelopment()) {
        externalJs = [
           'bower_components/jquery/dist/jquery.js',
           'bower_components/angular/angular.js',
           'bower_components/angular-ui-router/release/angular-ui-router.js',
           'bower_components/angular-bootstrap/ui-bootstrap.js',
           'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
           'bower_components/adal-angular/dist/adal.min.js',
           'bower_components/adal-angular/dist/adal-angular.min.js',
           "bower_components/angular-ui-grid/ui-grid.min.js",
        ];
    }
    else {
        externalJs = [
           'bower_components/jquery/dist/jquery.min.js',
           'bower_components/angular/angular.min.js',
           'bower_components/angular-ui-router/release/angular-ui-router.min.js',
           'bower_components/angular-bootstrap/ui-bootstrap.min.js',
           'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
           'bower_components/adal-angular/dist/adal.min.js',
           'bower_components/adal-angular/dist/adal-angular.min.js',
           "bower_components/angular-ui-grid/ui-grid.min.js",
        ];
    }

    return gulp.src(externalJs)
        .pipe(gulp.dest(config.paths.dest.externalJS)).pipe(print());
});

//Copy required external CSS files to wwwroot
gulp.task('copy-external-css', ['transform-less'], function () {
    //Add any external styles here
    var externalStyles = [
        'bower_components/bootstrap/dist/css/bootstrap.min.css', //sample path to all external styles
        'bower_components/office-ui-fabric/dist/css/fabric.min.css',
        "bower_components/angular-ui-grid/ui-grid.min.css"
    ];

    //Add any external fonts here
    //var fonts = '';
    //gulp.src(fonts)
    //    .pipe(gulp.dest(paths.dest.styles + '/fonts'));

    return gulp.src(externalStyles)
        .pipe(gulp.dest(config.paths.dest.externalCSS));
});


function prepareTemplates() {
    return gulp.src(config.paths.source.angularHtmlFiles)
        .pipe(minifyHtml())
        .pipe(angularTemplateCache({ standalone: false, module: 'Office365DemoApp' }));
}