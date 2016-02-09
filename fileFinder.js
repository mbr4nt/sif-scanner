var interpolate = require("interpolate");
var glob = require("glob");
module.exports = function(fileType, callback) {
  var path = interpolate("./sif/{fileType}/**.*", { fileType: fileType } );
  glob(path, callback);
}
