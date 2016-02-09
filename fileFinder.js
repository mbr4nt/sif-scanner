var interpolate = require("interpolate");
var glob = require("glob");
module.exports = function(path, callback) {
  glob(path, callback);
}
