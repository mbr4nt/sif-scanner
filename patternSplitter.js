var rl = require("./readLine.js");
var currentBlock = null;
var currentChildBlock = null;

module.exports = function(path, pattern, groupPattern, eachBlockCallback, doneCallback) {
  
  rl(path, line, done);

  function line(l) {
    if (pattern.test(l)) {
      if (currentBlock) {
        if(currentChildBlock) {
          if(!currentBlock.groups) {
            currentBlock.groups = [];
          }
          currentBlock.groups.push(currentChildBlock);
        }
        
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
    if(currentChildBlock) {
      currentBlock.groups.push(currentChildBlock);
    }
    eachBlockCallback(null, currentBlock);
    doneCallback();
  }
};

function addLine(pattern, line) {
  if(pattern.test(line)) {
    if(!currentChildBlock) {
      currentChildBlock = {};
    } else {
      if(!currentBlock.groups) {
        currentBlock.groups = [];
      }
      
      var clone = JSON.parse(JSON.stringify(currentChildBlock));
      
      currentBlock.groups.push(clone);
      currentChildBlock = {};
    }
  }
  
  var match = /^(\w+)\=(.+)/.exec(line);
  if (match) {
    if(currentChildBlock) {
      currentChildBlock[match[1]] = match[2];
    } else {
      currentBlock[match[1]] = match[2];
    }
  }
}
