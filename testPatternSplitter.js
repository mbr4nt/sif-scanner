ps = require("./patternSplitter.js");
ps("fix", /^3DLA\=/, function(err, block) {
  console.dir(block);
}, function(err) {
  console.log("done");
})
