var rl = require("./readLine.js");
var currentBlock = null;


module.exports = function(path, pattern, groupPattern, eachBlockCallback, doneCallback) {

  rl(path, line, done);

  function line(l) {
    if (pattern.test(l)) {
      if (currentBlock) {
        eachBlockCallback(null, currentBlock);
        currentBlock = {};
      } else {
        currentBlock = {};
      }
    }
    addLine(currentBlock, l);
  }

  function done() {
    doneCallback();
  }
};

function addLine(target, line) {
  var match = /^(\w+)\=(.+)/.exec(line);
  if (match) {
    target[match[1]] = match[2];
  }
}
