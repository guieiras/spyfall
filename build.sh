#!/bin/bash
echo '1/5 Remove previous deploy'
rm -rf web/build
rm -rf heroku/build
rm heroku/index.js
rm heroku/source.js
rm heroku/package.json
rm heroku/yarn.lock

echo '2/5 Copy server files'
cp index.js heroku/index.js
cp source.js heroku/source.js
cp package.json heroku/package.json
cp yarn.lock heroku/yarn.lock

echo '3/5 Build React Project'
cd web
yarn build

echo '4/5 Copy frontend files'
cp -r build ../heroku/build

echo '5/5 Commit and push to Heroku'
cd ../heroku
git add -A
git commit -m "$(date '+%Y-%m-%d %H:%M:%S')"
git push heroku master
# Done
