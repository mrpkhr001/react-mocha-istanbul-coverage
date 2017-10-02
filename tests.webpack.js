
// requires all components in `project/src/components/**/index.js`
// const sourceContext = require.context('./src', true, /\.js$/);
// sourceContext.keys().forEach(sourceContext);

var context = require.context('./test', true, /_test\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
