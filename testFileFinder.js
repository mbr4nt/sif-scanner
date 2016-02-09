var ff = require("./fileFinder.js");
ff("fix", function(err, files) {
  console.log(files);
});
