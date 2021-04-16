const { src, dest, series, watch } = require(`gulp`);
const babel = require(`gulp-babel`);
const htmlValidator = require(`gulp-html`);
const htmlCompressor = require(`gulp-htmlmin`);
const jsLinter = require(`gulp-eslint`);
const cssLinter = require(`gulp-stylelint`);
const jsCompressor = require(`gulp-uglify`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;
let browserChoice = `default`;

async function safari () {
  browserChoice = `safari`;
}

async function firefox () {
  browserChoice = `firefox`;
}

async function chrome () {
  browserChoice = `google chrome`;
}

async function opera () {
  browserChoice = `opera`;
}

async function edge () {
  browserChoice = `microsoft-edge`;
}

async function allBrowsers () {
  browserChoice = [
      `safari`,
      `firefox`,
      `google chrome`,
      `opera`,
      `microsoft-edge`
  ];
}

let validateHTML = () => {
  return src([
      `dev/*.html`])
      .pipe(htmlValidator());
};

let compressHTML = () => {
  return src([`dev/*.html`])
      .pipe(htmlCompressor({collapseWhitespace: true}))
      .pipe(dest(`prod`));
};

let lintJS = () => {
  return src(`dev/scripts/*.js`)
      .pipe(jsLinter({
          parserOptions: {
              ecmaVersion: 2017,
              sourceType: `module`
          },
          rules: {
              indent: [2, 4, {SwitchCase: 1}],
              quotes: [2, `backtick`],
              semi: [2, `always`],
              'linebreak-style': [2, `unix`],
              'max-len': [1, 85, 4]
          },
          env: {
              es6: true,
              node: true,
              browser: true
          },
          extends: `eslint:recommended`
      }))
      .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

let transpileJSForProd = () => {
  return src(`dev/js/*.js`)
      .pipe(babel())
      .pipe(jsCompressor())
      .pipe(dest(`prod/scripts`));
};

let lintCSS = () => {
  return src(`dev/css/*.css`)
      .pipe(cssLinter({
          failAfterError: true,
          reporters: [
              {formatter: `verbose`, console: true}
          ]
      }));
};

let compileCSSForProd = () => {
  return src(`dev/css/style.css`)
      .pipe(sass({
          outputStyle: `compressed`,
          precision: 10
      }).on(`error`, sass.logError))
      .pipe(dest(`prod/css`));
};

let serve = () => {
  browserSync({
      notify: true,
      reloadDelay: 1,
      server: {
          baseDir: [
              `dev`,
          ]
      }
  });

  watch(`dev/js/*.js`,
      series(lintJS)
  ).on(`change`, reload);

  watch(`dev/css/**/*.scss`,
      series(lintCSS)
  ).on(`change`, reload);

  watch(`dev/**/*.html`,
      series(validateHTML)
  ).on(`change`, reload);

};

async function clean() {
  let fs = require(`fs`),
      i,
      foldersToDelete = [`./temp`, `prod`];

  for (i = 0; i < foldersToDelete.length; i++) {
      try {
          fs.accessSync(foldersToDelete[i], fs.F_OK);
          process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
              ` directory was found and will be deleted.\n`);
          del(foldersToDelete[i]);
      } catch (e) {
          process.stdout.write(`\n\tThe ` + foldersToDelete[i] +
              ` directory does NOT exist or is NOT accessible.\n`);
      }
  }

  process.stdout.write(`\n`);
}

exports.safari = series(safari, serve);
exports.firefox = series(firefox, serve);
exports.chrome = series(chrome, serve);
exports.opera = series(opera, serve);
exports.edge = series(edge, serve);
exports.safari = series(safari, serve);
exports.allBrowsers = series(allBrowsers, serve);
exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.build = series(compressHTML, compileCSSForProd, transpileJSForProd);
exports.serve = series(validateHTML, compressHTML, lintCSS, lintJS, serve);
exports.clean = clean;
