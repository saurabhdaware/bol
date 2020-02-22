const fse = require('fs-extra');

fse.removeSync('dist');
fse.copy('src', 'dist');