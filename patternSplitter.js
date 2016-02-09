var rl = require("./readLine.js");


module.exports = function(path, pattern, eachBlockCallback, doneCallback) {
  var currentBlock = {};

  rl(path, line, done);

  function line(l) {
    if(pattern.test(l)) {
      if(currentBlock) {
        eachBlockCallback(null, currentBlock);
        currentBlock = {};
      }
    }
    addLine(currentBlock, l);
  }

  function done() {
    doneCallback();
  }
}

function addLine (target, line) {
  var match = /^(\w+)\=(.+)/.exec(line);
  if(match) {
    target[match[1]] = match[2];
  }
}
