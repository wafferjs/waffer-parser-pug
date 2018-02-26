const pug = require('pug');

const cwd = process.cwd();

module.exports = server => {
  const parse = (file, next, exp, options) => {
    let html;
    let err;

    try {
      html = pug.renderFile(file, options || {});
    } catch (e) {
      err = e;
    }

    if (exp && !err) {
      return next(null, require('waffer-parser-html')(server)._export(html, file));
    }

    return next(err, html);
  }

  return { parse, ext: '.html' }
}
