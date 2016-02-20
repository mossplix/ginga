var gulp = require('gulp');
var browserify = require('browserify');
var jszip  = require('jszip');
var react = require('gulp-react');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watchify     = require('watchify');
var bundleLogger = require('./web/static/js/utils/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('./web/static/js/utils/handleErrors');
var config       = require('./web/static/js/configs').browserify;
var babelify     = require('babelify');
var browserSync = require('browser-sync');
var config      = require('./web/static/js/configs').browserSync;
var reactify = require('reactify');
var path       = require('path'),
     es6ify     = require('es6ify')
    ;

const babel = require('gulp-babel');

var closureCompiler = require('gulp-closure-compiler');


gulp.task('react2', () => {
	return gulp.src('web/static/js/app.js')
		.pipe(babel({
			presets: ['es2015','react']
		}))
		.pipe(gulp.dest('priv/static/js/'));
});

gulp.task('browserSync', ['build'], function() {
    browserSync(config);
});


gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});


gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});


gulp.task('watch', ['setWatch', 'browserSync'], function() {
    gulp.watch(config.markup.src, ['markup']);
});



gulp.task('browserify', function(callback) {



    var browserifyThis = function(bundleConfig) {

        var bundler = browserify({
            // Required watchify args
            cache: {}, packageCache: {}, fullPaths: false,
            // Specify the entry point of your app
            entries: bundleConfig.entries,
            // Add file extentions to make optional in your requires
            extensions: config.extensions,
            // Enable source maps!
            debug: config.debug
        });

        var bundle = function() {
            // Log when bundling starts
            bundleLogger.start(bundleConfig.outputName);

            return bundler
                .bundle()
                // Report compile errors
                .on('error', handleErrors)
                // Use vinyl-source-stream to make the
                // stream gulp compatible. Specifiy the
                // desired output filename here.
                .pipe(source(bundleConfig.outputName))
                // Specify the output destination
                .pipe(gulp.dest(bundleConfig.dest))
                .on('end', reportFinished);
        };

        bundler.transform(babelify.configure({stage: 1}));

        if (global.isWatching) {
            // Wrap with watchify and rebundle on changes
            bundler = watchify(bundler);
            // Rebundle on update
            bundler.on('update', bundle);
        }

        var reportFinished = function() {
            // Log when bundling completes
            bundleLogger.end(bundleConfig.outputName);


        };

        return bundle();
    };

    // Start bundling with Browserify for each bundleConfig specified
    config.bundleConfigs.forEach(browserifyThis);
});





gulp.task('react', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: 'web/static/js/app.js',
        debug: true,
        require: [
    'fs',
    'jszip'
  ]

    }).transform(babelify.configure({stage: 1}));
        //.add(es6ify.runtime).transform(es6ify);

    return b.bundle()

        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.




       //.pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('priv/static/js/'));
});






gulp.task('app-concat', function() {
    return gulp.src(['priv/static/js/app/*.js'])
        .pipe(concat({ path: 'app.js'}))
        .pipe(gulp.dest('priv/static/js/'));
});


gulp.task('css-concat', function() {
    return gulp.src(['priv/static/css/*.css','../static/css/**/*.css'])
        .pipe(concat({ path: 'app.css'}))
        .pipe(gulp.dest('priv/static/styles/'));
});
gulp.task('vendor-concat', function() {
    return gulp.src(['priv/static/js/vendor/**/dist/*.js','priv/static/js/vendor/**/*.js'])
        .pipe(concat({ path: 'lib.js'}))
        .pipe(gulp.dest( 'priv/static/js/'));
});

gulp.task('setWatch', function() {
    global.isWatching = true;
});


gulp.task('watch', function() {
    gulp.watch(['web/static/js/*.js','web/static/js/components/*.js','client/components/**/*.js','web/static/js/constants/*.js','web/static/js/storage/*.js','web/static/js/actions/*.js','web/static/js/config/*.js','web/static/js/stores/*.js','web/static/js/utils/*.js'], ['react']);
    //gulp.watch('../static/js/vendor/**', ['vendor-concat']);
    //gulp.watch('./static/js/app/*.js', ['app-concat']);
    //gulp.watch(['../static/css/*.css','../static/css/**/*.css'], ['css-concat']);
});




//gulp.task('default', ['set-prod-node-env','react', 'watch']);
gulp.task('default', ['react2', 'watch']);
