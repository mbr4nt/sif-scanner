var ps = require("./patternSplitter.js");

module.exports = function(path, headerPattern, subGroupPattern, filter, callback) {
  var items = [];

  ps(path, headerPattern, subGroupPattern, function(err, block) {
      if (err) {
        return callback(err);
      }

      if (filter && filter(block)) {
        items.push(block);
      }
      else if (!filter) {
        items.push(block);
      }
    },
    function(err) {
      callback(err, items);
    });
};
