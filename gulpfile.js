const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

const browserSync = require("browser-sync").create(); // 修正（`.create()`を追加）

const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const htmlBeautify = require("gulp-html-beautify");
const pug = require("gulp-pug"); // Pugを追加

// ✅ PugをHTMLにコンパイル
function compilePug() {
  return gulp
    .src("./src/pug/**/*.pug") // Pugファイルを取得
    .pipe(pug({ pretty: true })) // HTMLを整形して出力
    .pipe(gulp.dest("./public")) // HTMLファイルを `public` に出力
    .on("end", () => console.log("Pug compilation finished!"));
}

// ✅ Sassをコンパイルし、CSSを圧縮
function compileSass() {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssSorter()]))
    .pipe(mmq())
    .pipe(gulp.dest("./public/assets/css"))
    .pipe(cleanCss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./public/assets/css"))
    .on("end", () => console.log("Sass compilation finished!"));
}

// ✅ JSを圧縮
function minJS() {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./public/assets/js"));
}

// ✅ HTMLを整形
function formatHTML() {
  return gulp
    .src("./src/**/*.html")
    .pipe(
      htmlBeautify({
        indent_size: 2,
        indent_with_tabs: true,
      })
    )
    .pipe(gulp.dest("./public"));
}

// ✅ 画像をコピー
function copyImage() {
  return gulp.src("./src/img/**/*").pipe(gulp.dest("./public/assets/img"));
}

// ✅ ブラウザをリロード
function browserReload(done) {
  browserSync.reload();
  done();
}

// ✅ 開発用サーバーを起動
function browserInit() {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
  });
}

// ✅ ファイル変更を監視
function watch() {
  gulp.watch("./src/sass/**/*.scss", gulp.series(compileSass, browserReload));
  gulp.watch("./src/pug/**/*.pug", gulp.series(compilePug, browserReload)); // Pugの監視を追加
  gulp.watch("./src/js/**/*.js", gulp.series(minJS, browserReload));
}

// ✅ Gulpのタスクを登録
exports.compilePug = compilePug; // Pugコンパイルを追加
exports.compileSass = compileSass;
exports.minJS = minJS;
exports.formatHTML = formatHTML;
exports.copyImage = copyImage;
exports.watch = watch;
exports.browserInit = browserInit;

// ✅ `build` タスクに Pug を追加
exports.build = gulp.parallel(
  compileSass,
  compilePug,
  minJS,
  formatHTML,
  copyImage
);

// ✅ `dev` タスクを実行すると開発環境が起動
exports.dev = gulp.parallel(watch, browserInit);

// ✅ `default` タスクを設定
exports.default = gulp.parallel(watch, browserInit);
