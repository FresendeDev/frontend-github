const gulp = require("gulp");
const concat = require("gulp-concat");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const image = require("gulp-image");

function tarefasCSS(cb) {
  // origem arquivo
  return (
    gulp
      .src([
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./vendor/owl/css/owl.css",
        "./vendor/jquery-ui/jquery-ui.min.css",
        "./vendor/fontawesome/fontawesome.css",
        "./src/css/style.css",
      ])
      // pipe  metodos de tratamento gulp

      .pipe(concat("styles.css")) //         mescla arquivos
      .pipe(cssmin()) //                     minifica css
      .pipe(rename({ suffix: ".min" })) //   styles.min.css
      .pipe(gulp.dest("./dist/css")) //      cria arquivo em novo diretório
  );
}

function tarefasJS() {
  return gulp
    .src([
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "./vendor/owl/js/owl.js",
      "./vendor/jquery-mask/jquery.mask.min.js",
      "./vendor/jquery-ui/jquery-ui.min.js",
      "./src/js/custom.js",
    ])

    .pipe(concat("scripts.js")) // mescla arquivos
    .pipe(uglify()) // minifica js
    .pipe(rename({ suffix: ".min" })) // scripts.min.js
    .pipe(gulp.dest("./dist/js")); //      cria arquivo em novo diretório
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

// para o node compreender a funcao necessario exprtar
exports.styles = tarefasCSS;
exports.scripts = tarefasJS;
exports.images = tarefasImagem;
