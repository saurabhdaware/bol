const fse = require('fs-extra');
const minify = require('@node-minify/core');
const terser = require('@node-minify/terser');


console.log("Build started... \n🌻");

fse.removeSync('dist');
console.log("🌻 🌻")
fse.copySync('src', 'dist');
console.log("🌻 🌻 🌻")

const voicesFile = fse.readFileSync('src/voices.mjs');
console.log("🌻 🌻 🌻 🌻");
const indexFile = fse.readFileSync('src/index.mjs');
console.log("🌻 🌻 🌻 🌻 🌻");

let bolFile = voicesFile + '\n' + indexFile;

bolFile = bolFile
  .replace(/\b.*(export default).*/g, '')
  .replace(/\b(export)\b/g, '')
  .replace(/\b.*(import).*/g, '')

fse.writeFileSync('dist/bol.js', bolFile);
console.log("🌻 🌻 🌻 🌻 🌻 🌻");

minify({
  compressor: terser,
  input: 'dist/bol.js',
  output: 'dist/bol.min.js',
  callback: function(err, min) {}
});

console.log("🌻 🌻 🌻 🌻 🌻 🌻 🌻 DONE 🎉");