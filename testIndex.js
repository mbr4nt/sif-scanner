var me = require("./index.js");
var fs = require("fs");

me("./sif/**.MON", /^PO\=/, [ /^3DLA=/, /^ON=/ ], null, done);

function filter(item) {
  return item.PN == "A19-HWS";
}

function done(err, results) {
  fs.writeFile("./testIndex.json", JSON.stringify(results, null, "\t"), function() {
    console.log("ALL DONE");
  });
}
