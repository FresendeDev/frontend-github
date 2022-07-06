const gulp = require("gulp");
const { series, parallel } = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const image = require("gulp-image");
const stripJs = require("gulp-strip-comments");
const stripCss = require("gulp-strip-css-comments");
const htmlmin = require("gulp-htmlmin");
const removeHtmlComments = require("gulp-remove-html-comments");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

function tarefasCSS(cb) {
  // origem arquivo

  gulp
    .src([
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "./vendor/owl/css/owl.css",
      "./vendor/jquery-ui/jquery-ui.min.css",
      "./vendor/fontawesome/fontawesome.css",
      "./src/css/style.css",
    ])
    // pipe  metodos de tratamento gulp
    .pipe(stripCss()) // remove comentários
    .pipe(concat("styles.css")) //         mescla arquivos
    .pipe(cssmin()) //                     minifica css
    .pipe(rename({ suffix: ".min" })) //   styles.min.css
    .pipe(gulp.dest("./dist/css")); //      cria arquivo em novo diretório

  cb();
}

function tarefasJS(callback) {
  gulp
    .src([
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "./vendor/owl/js/owl.js",
      "./vendor/jquery-mask/jquery.mask.min.js",
      "./vendor/jquery-ui/jquery-ui.min.js",
      "./src/js/custom.js",
    ])
    .pipe(babel())
    // .pipe(stripJs()) // remove comentários
    .pipe(concat("scripts.js")) // mescla arquivos
    .pipe(uglify()) // minifica js
    .pipe(rename({ suffix: ".min" })) // scripts.min.js
    .pipe(gulp.dest("./dist/js")); //      cria arquivo em novo diretório
  return callback();
}

function tarefasImagem() {
  return gulp
    .src("./src/images/*")
    .pipe(
      image({
        pngquant: true,
        optipng: true, // mudei para true
        zopflipng: true,
        jpegRecompress: true, // mudei para true
        mozjpeg: true,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true,
      })
    )
    .pipe(gulp.dest("./dist/images"));
}

function tarefasHTML(callback) {
  gulp
    .src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(removeHtmlComments())
    .pipe(gulp.dest("./dist"));

  return callback();
}

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("./src/**/*").on("change", process); // repete o processo quando alterar algo em src
  gulp.watch("./src/**/*").on("change", reload);
});

// conclusao do modulo
function end(cb) {
  console.log(
    "tarefas concluidas, tudo 100%, muito boa a aula, se algum leu essa msg por favor responda que sim"
  );
  return cb();
}

// parallel vs series
const process = series(tarefasHTML, tarefasJS, tarefasCSS, end);

// para o node compreender a funcao necessario exprtar
exports.styles = tarefasCSS;
exports.scripts = tarefasJS;
exports.images = tarefasImagem;
exports.html = tarefasHTML;
exports.default = process;

exports.default = process;
