var me = require("./index.js");
me("./sif/**.PLI", /^PN\=/, filter, done);

function filter(item) {
  return item.PN == "A19-HWS";
}

function done(err, results) {
  console.log(results);
}
