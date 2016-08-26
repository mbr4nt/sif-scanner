var rl = require("./readLine.js");

module.exports = function(input, pattern, groupPattern, eachBlockCallback, doneCallback) {
    var currentBlock = null;
    var currentChildBlock = null;

    if (groupPattern && !Array.isArray(groupPattern)) {
        groupPattern = [groupPattern];
    }
    rl(input, line, done);
   

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

    function addLine(patterns, line) {
        if (patterns) {
            patterns.forEach(function(pattern) {
                if (pattern.test(line)) {
                    if (!currentChildBlock) {
                        currentChildBlock = {};
                    }
                    else {
                        currentBlock = addChildBlock(currentBlock, currentChildBlock);
                        currentChildBlock = {};
                    }
                }
            });
        }

        var match = /^(\w+)\=(.+)/.exec(line);
        if (match) {
            if (currentChildBlock) {
                currentChildBlock[match[1].trim()] = match[2].trim();
            }
            else if(currentBlock) {
                currentBlock[match[1].trim()] = match[2].trim();
            }
        }
    }
};
