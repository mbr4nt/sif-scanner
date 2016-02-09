var me = require("./index.js");
me("fix", /^3DLA\=/, filter, done);

function filter(item) {
  return item.IM == "P27";
}

function done(err, results) {
  console.log(results);
}
