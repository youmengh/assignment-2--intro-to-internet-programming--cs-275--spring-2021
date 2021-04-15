const { src, dest, series, watch } = require(`gulp`);
const babel = require(`gulp-babel`);
const htmlValidator = require(`gulp-html`);
const htmlCompressor = require(`gulp-htmlmin`);

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

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;