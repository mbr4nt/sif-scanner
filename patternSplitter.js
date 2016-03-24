var rl = require("./readLine.js");

module.exports = function(path, pattern, groupPattern, eachBlockCallback, doneCallback) {
  var currentBlock = null;
  var currentChildBlock = null;

  rl(path, line, done);

  function line(l) {
    if (pattern.test(l)) {
      if (currentBlock) {
        currentBlock = addChildBlock(currentBlock, currentChildBlock);
        eachBlockCallback(null, currentBlock);

        currentBlock = {};
        currentChildBlock = null;
      }
      else {
        currentBlock = {};
      }
    }

    addLine(groupPattern, l);
  }

  function done() {
    currentBlock = addChildBlock(currentBlock, currentChildBlock);
    eachBlockCallback(null, currentBlock);
    doneCallback();
  }

  function addChildBlock(parent, child) {
    if (child) {
      if (!parent.groups) {
        parent.groups = [];
      }
      parent.groups.push(child);
    }

    return parent;
  }

  function addLine(pattern, line) {
    if (pattern && pattern.test(line)) {
      if (!currentChildBlock) {
        currentChildBlock = {};
      }
      else {
        currentBlock = addChildBlock(currentBlock, currentChildBlock);
        currentChildBlock = {};
      }
    }

    var match = /^(\w+)\=(.+)/.exec(line);
    if (match) {
      if (currentChildBlock) {
        currentChildBlock[match[1]] = match[2];
      }
      else {
        currentBlock[match[1]] = match[2];
      }
    }
  }
};
