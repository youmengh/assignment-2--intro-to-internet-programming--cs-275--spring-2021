const { src, dest, series, watch } = require(`gulp`);
const babel = require(`gulp-babel`);
const htmlValidator = require(`gulp-html`);

let validateHTML = () => {
  return src([
      `dev/html/*.html`,
      `dev/html/**/*.html`])
      .pipe(htmlValidator());
};

exports.validateHTML = validateHTML;