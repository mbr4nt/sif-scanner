ps = require("./patternSplitter.js");
module.exports = function(path, headerPattern, filter, callback) {
  var items = [];
  ps(path, headerPattern, function(err, block) {
    if(filter(block)) {
      items.push(block);
    }
  },
  function(err) {
    callback(err, items);
  });
}
