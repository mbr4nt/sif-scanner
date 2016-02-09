ps = require("./patternSplitter.js");
module.exports = function(fileType, headerPattern, filter, callback) {
  var items = [];
  ps(fileType, headerPattern, function(err, block) {
    if(filter(block)) {
      items.push(block);
    }
  },
  function(err) {
    callback(err, items);
  });
}
