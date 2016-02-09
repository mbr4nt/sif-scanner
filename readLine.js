var fs = require('fs');
var ff = require("./fileFinder.js");
var async = require("async");

function readLines(input, func, done) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
    done();
  });
}

module.exports = function(fileType, lineCallBack, doneCallback) {
  ff("fix", function(err, files) {
    async.map(files, function(file, fileCallback) {
      var input = fs.createReadStream(file);
      readLines(input, lineCallBack, fileCallback);
    }, doneCallback);
  });
}
