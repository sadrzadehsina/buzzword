'use strict';
const importJsx = require('import-jsx');
process.env.FORCE_COLOR = '1';

process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
importJsx('./buzzword');
// setTimeout(() => importJsx('./buzzword.js') , 500);
