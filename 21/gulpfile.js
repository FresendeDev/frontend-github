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
const sass = require("gulp-sass")(require("node-sass"));
const clean = require("gulp-clean");

// arruma css inicial
function tarefasCSS(cb) {
  return (
    gulp
      .src([
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./vendor/owl/css/owl.css",
        "./vendor/jquery-ui/jquery-ui.min.css",
        "./vendor/fontawesome/fontawesome.css", // origem arquivo
      ])
      // pipe  metodos de tratamento gulp
      .pipe(stripCss()) // remove comentários
      .pipe(concat("libs.css")) //         mescla arquivos
      .pipe(cssmin()) //                     minifica css
      .pipe(rename({ suffix: ".min" })) //   libs.min.css
      .pipe(gulp.dest("./tmp/css"))
  ); //      cria arquivo em novo diretório
}

// arruma sass
function tarefasSASS(cb) {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" })) // processa e minifica
    .pipe(gulp.dest("./tmp/css"));
}

// arruma js
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
  callback();
}

// imagens
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

// arruma html
function tarefasHTML(callback) {
  gulp
    .src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(removeHtmlComments())
    .pipe(gulp.dest("./dist"));

  return callback();
}

// arquivos dependencias finais 1
function tarefasDEP(callback) {
  return gulp.src("./vendor/fonts*/**").pipe(gulp.dest("./dist")); // arquivos para o fontawesome
}

// arquivos dependencias finais 2
function tarefasDEP2() {
  return gulp
    .src("./vendor/jquery-ui/images*/**")
    .pipe(gulp.dest("./dist/css")); // arquivos para o jquery ui
}

// ajuste final css
function tarefasFIMCSS(cb) {
  return (
    gulp
      .src(["./tmp/css/libs.min.css", "./tmp/css/style.css"])
      // .pipe(stripCss()) // remove comentários
      .pipe(concat("styles.css")) //         mescla arquivos
      .pipe(cssmin()) //                     minifica css
      .pipe(rename({ suffix: ".min" })) //   libs.min.css
      .pipe(gulp.dest("./dist/css"))
  ); //      cria arquivo em novo diretório
}

// dependencias

// limpa tmp
function tarefasLIMPAR() {
  return gulp.src("./tmp").pipe(clean());
}

// servidor
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("./src/**/*").on("change", process); // repete o processo quando alterar algo em src
  gulp.watch("./src/**/*").on("change", reload);
});

// conclusao do modulo
// function end(cb) {
//   console.log(
//     "tarefas concluidas, tudo 100%, muito boa a aula, se algum leu essa msg por favor responda que sim"
//   );
//   return cb();
// }

// parallel vs series
const process = series(
  tarefasHTML,
  tarefasJS,
  tarefasCSS,
  tarefasSASS,
  tarefasFIMCSS,
  tarefasDEP,
  tarefasDEP2,
  tarefasLIMPAR
);

// para o node compreender a funcao necessario exprtar
exports.styles = tarefasCSS;
exports.scripts = tarefasJS;
exports.images = tarefasImagem;
exports.html = tarefasHTML;
exports.sass = tarefasSASS;
exports.fimcss = tarefasFIMCSS;
exports.limpar = tarefasLIMPAR;
exports.dep = tarefasDEP;
exports.dep2 = tarefasDEP2;

exports.default = process;
