# Messing, with react
Just a fun personal project, following along with guides and docs to learn react so it can influence my other projects. 

As of right now all code is from a guide on frontendmasters.com, cloned from [this](https://github.com/btholt/complete-intro-to-react/tree/start "btholt's guide") repo

## helpful tools
#### general
```
npm install --global yarn
npm install --global standard
```

#### bundle/packaging
```
look up the correct version
npm install --global webpack@v2.1.0-beta.25
to bundle
webpack js/clientApp.js public/bundle.js
for production
NODE_ENV=production webpack -p js/clientApp.js public/bundle.js
```
#### babel-ifying: make sure your program runs all your js as babel(ES6=>ES5)
```
webpack --module-bind='js=babel' js/clientApp.js public/bundle.js
```
