const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const browserSync = require("browser-sync").create();
const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const htmlBeautify = require("gulp-html-beautify");
const pug = require("gulp-pug");
const gulpIf = require("gulp-if"); // ✅ 条件分岐のために追加

// ✅ PugをHTMLにコンパイル
function compilePug() {
  return gulp
    .src("./src/pug/**/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./public"))
    .on("end", () => console.log("✅ Pug compilation finished!"));
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
    .on("end", () => console.log("✅ Sass compilation finished!"));
}

// ✅ すでに `.min.js` のファイルはそのままコピー
function copyMinJS() {
  return gulp
    .src("./src/js/**/*.min.js") // ✅ 既に .min の JS だけを取得
    .pipe(gulp.dest("./public/assets/js"))
    .on("end", () => console.log("✅ 既に min の JS をコピーしました！"));
}

// ✅ JSを圧縮（.min.js は圧縮・rename しない）
function minJS() {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(gulpIf(file => !file.basename.endsWith(".min.js"), uglify())) // ✅ すでに `.min.js` のものは圧縮しない
    .pipe(gulpIf(file => !file.basename.endsWith(".min.js"), rename({ suffix: ".min" }))) // ✅ すでに `.min.js` のものは rename しない
    .pipe(gulp.dest("./public/assets/js"))
    .on("end", () => console.log("✅ JS minify 完了！"));
}

// ✅ minJS と copyMinJS を並列実行するタスク
const processJS = gulp.parallel(minJS, copyMinJS);

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
  gulp.watch("./src/pug/**/*.pug", gulp.series(compilePug, browserReload));
  gulp.watch("./src/js/**/*.js", gulp.series(processJS, browserReload)); // ✅ minJS → processJS に変更
}

// ✅ Gulpのタスクを登録
exports.compilePug = compilePug;
exports.compileSass = compileSass;
exports.minJS = processJS; // ✅ minJS を修正（gulp.parallel(minJS, copyMinJS) を適用）
exports.formatHTML = formatHTML;
exports.copyImage = copyImage;
exports.watch = watch;
exports.browserInit = browserInit;


// ✅ `build` タスクに Pug を追加
exports.build = gulp.parallel(
  compileSass,
  compilePug,
  processJS, // ✅ minJS を更新（修正後のバージョンを適用）
  formatHTML,
  copyImage
);

// ✅ `default` タスクを設定（watch と browserInit を実行）
exports.default = gulp.parallel(watch, browserInit);