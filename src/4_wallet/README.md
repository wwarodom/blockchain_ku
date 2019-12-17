# Install
npm install

# Run
node index.js
- or -
npm run start


### Faq

## For Windows
if there is an error about MSB4132 (from node-gyp),
try to run with administrator privilege: 
```  
   npm install --global --production windows-build-tools
```
 If there is error about existing python, please uninstall and try again.

## For Mac OSX
problem about loader.js (npm problem)
try: 
```
rm -rf node_modules
npm i -g npm@latest
npm i core-util-is
```