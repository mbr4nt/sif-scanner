# sif-scanner

```js
var sifScanner = require("sif-scanner");
sifScanner("./sif/**.PLI", /^PN\=/, filter, done);

function filter(item) {
  return item.PN == "A19-HWS";
}

function done(err, results) {
  console.log(results);
}
```
