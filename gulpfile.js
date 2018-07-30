var gulp 				= require('gulp'),
		babel				= require('gulp-babel'),
		concat			= require('gulp-concat'),
		sourcemaps	= require('gulp-sourcemaps'),
		uglify 			= require('gulp-uglify'),
		sass 				= require('gulp-sass')
		plumber 		= require('gulp-plumber'),
		prefix 			= require('gulp-autoprefixer'),
		imagemin 		= require('gulp-imagemin'),
		browserify	=	require('gulp-browserify'),
		rename			=	require('gulp-rename'),
		browserSync	=	require('browser-sync').create();

// Scripts task
// Uglifies javascript files
gulp.task('scripts', function() {
	gulp.src('./src/js/main.js')
		.pipe(plumber())
		.pipe(browserify())
		.pipe(babel())
		.pipe(uglify())
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('./build/js'));
});

// Styles task
// Compiles sass and autoprefixes CSS
gulp.task('styles', function() {
	gulp.src('./src/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(prefix())
		.pipe(gulp.dest('./build/css'));
});

// Images task
// Compresses image files
gulp.task('images', function() {
	gulp.src('./src/img/*')
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('./build/img'));
});

// HTML task
// Copies html files
gulp.task('html', function() {
	gulp.src('./src/html/*.html')
		.pipe(plumber())
		.pipe(gulp.dest('./build'));
});

// Browser Sync
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			proxy: 'localhost:9000',
			baseDir: './build'
		}
	});
});

// LiveReload task
gulp.task('reload', ['browser-sync'], function() {
	gulp.watch('./src/js/**/*.js', ['scripts']);
	gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/img/*', ['images']);
	gulp.watch('./src/html/*.html', ['html']);
	gulp.watch(['/src/html/*.html', './src/js/**/*.js', './src/sass/**/*.scss']).on('change', browserSync.reload);
});

// Watch task
gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['scripts']);
	gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/img/*', ['images']);
	gulp.watch('./src/html/*.html', ['html']);
});

gulp.task('default', ['scripts', 'styles', 'images', 'html', 'reload']);
gulp.task('dev', ['scripts', 'styles', 'images', 'html', 'watch']);
gulp.task('build', ['scripts', 'styles', 'images', 'html']);