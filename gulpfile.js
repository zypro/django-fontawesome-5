const gulp = require('gulp')

const plumber = require('gulp-plumber')

const scss = require('gulp-scss')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

gulp.task('css', () => {

  const plugins = [
      autoprefixer(),
      cssnano()
  ]
  return gulp.src('src/scss/django-fontawesome.scss')
      .pipe(plumber())
      .pipe(scss())
      .pipe(postcss(plugins))
      .pipe(gulp.dest('fontawesome5/static/fontawesome/css/'))
})

gulp.task('js', () => {
  return gulp.src('src/js/django-fontawesome.js')
  .pipe(plumber())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('fontawesome5/static/fontawesome/js/'))
})

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['css'])
    .on('change', event => {
      console.log('File ' + event.type + ', running tasks...')
    })
  gulp.watch('src/js/**/*.js', ['js'])
    .on('change', event => {
      console.log('File ' + event.type + ', running tasks...')
    })
  
})

gulp.task('build', ['css', 'js'])