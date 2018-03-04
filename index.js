const fs  = require('fs-extra')
const pug = require('pug')

const cwd = process.cwd()

module.exports = server => {
  const parse = async (file, exporting = false, options) => {
    const buf = await fs.readFile(file)
    const html = pug.render(`${buf}`, options || {});

    if (exporting) {
      return { content: server.parser('.html')._export(html, file, options) + '\n' } 
    }

    return { content: html }
  }

  return { parse, ext: '.html' }
}
