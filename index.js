var ps = require("./patternSplitter.js");

module.exports = function(input, headerPattern, subGroupPattern, filter, callback) {
  var items = [];
  
  //backwards compatibility, older version expected a path string instead of an object.
  if(!input.path && !input.content) {
    input = {
      path: input
    };
  }

  ps(input, headerPattern, subGroupPattern, function(err, block) {
      if (err) {
        return callback(err);
      }

      if(!block) {
        return;
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
