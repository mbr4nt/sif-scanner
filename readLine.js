var glob = require("glob");
var fs = require('fs');
var async = require("async");

function readLines(stream, func, done) {
  var remaining = '';

  stream.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  stream.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
    done();
  });
}

module.exports = function(input, lineCallBack, doneCallback) {
  if(input.path) {
    glob(input.path, function(err, files) {
      if (err) {
        return doneCallback(err);
      }
  
      async.map(files, function(file, fileCallback) {
        var stream = fs.createReadStream(file);
        readLines(stream, lineCallBack, fileCallback);
      }, doneCallback);
    });
  }
  else if(input.content) {
    var lines = input.content.split(/\r?\n/);
    lines.forEach(function(line) {
      lineCallBack(line);
    });
    doneCallback();
  }
};
