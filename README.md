# sif-scanner
```
npm install sif-scanner
```

##fiding default cad layer materials
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

##finding the list of options for a model

```js
var sifScanner = require("sif-scanner");
sifScanner("./sif/**.key", /^PN\=/, filter, done);

function filter(item) {
  return item.PN == "A19-HWS";
}

function done(err, results) {
  var item = results[0];
  var keyIndex = 0;
  var optionKeys = [];
  while(item["G" + keyIndex]) {
    optionKeys.push(item["G" + keyIndex]);
    keyIndex ++;
  }

  console.dir(optionKeys);
}
```
