var rl = require("./readLine.js");
rl("fix", line, done);

function line(l) {
  console.log(l);
}

function done() {
  console.log("done");
}
