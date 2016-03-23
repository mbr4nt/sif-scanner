var me = require("./index.js");

me("./sif/**.3", /^PO\=/, null, null, done);

function filter(item) {
  return item.PN == "A19-HWS";
}

function done(err, results) {
  console.log(results);
}
