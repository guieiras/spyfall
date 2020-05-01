const fs = require('fs');
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');
const Promisify = require('util').promisify;
const { spawn } = require('child_process');

Promise.all([
  Promisify(rimraf)('heroku/build'),
  fs.existsSync('heroku/index.js') ? Promisify(fs.unlink)('heroku/index.js') : Promise.resolve(),
  fs.existsSync('heroku/package.json') ? Promisify(fs.unlink)('heroku/package.json') : Promise.resolve(),
  fs.existsSync('heroku/source.js') ? Promisify(fs.unlink)('heroku/source.js') : Promise.resolve(),
  fs.existsSync('heroku/yarn.lock') ? Promisify(fs.unlink)('heroku/yarn.lock') : Promise.resolve()
]).then(() => {
  Promise.all([
    Promisify(fs.copyFile)('index.js', 'heroku/index.js'),
    Promisify(fs.copyFile)('package.json', 'heroku/package.json'),
    Promisify(fs.copyFile)('source.js', 'heroku/source.js'),
    Promisify(fs.copyFile)('yarn.lock', 'heroku/yarn.lock')
  ]).then(() => {
    const build = spawn('web/node_modules/.bin/react-scripts', ['build']);
    build.on('close', () => {
      Promisify(ncp)('web/build', 'heroku/build').then(() => {
        console.log('Ready to commit and push!');
      });
    });
  });
});
