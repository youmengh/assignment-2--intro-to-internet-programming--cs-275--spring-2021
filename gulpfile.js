const { src, dest, series, watch } = require(`gulp`);
const babel = require(`gulp-babel`);
const htmlValidator = require(`gulp-html`);
const htmlCompressor = require(`gulp-htmlmin`);
const jsLinter = require(`gulp-eslint`);

let validateHTML = () => {
  return src([
      `dev/html/*.html`,
      `dev/html/**/*.html`])
      .pipe(htmlValidator());
};

let compressHTML = () => {
  return src([`dev/html/*.html`,`dev/html/**/*.html`])
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

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.lintJS = lintJS;