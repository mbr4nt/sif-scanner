# sif-scanner
```
npm install sif-scanner
```

##finding default cad layer materials
```node
var sifScanner = require("sif-scanner");
sifScanner("./sif/**.PLI", /^PN\=/, filter, done);

function filter(item) {
  return item.PN == "A19-HWS";
}

function done(err, results) {
  console.log(results);
}
```

##finding the list of option keys for a model

```node
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

##finding cad layer for an option key
```node
var sifScanner = require("sif-scanner");
sifScanner("./sif/**.MON", /^PO\=/, filter, done);

function filter(item) {
  return item.PO == "19HWB";
}

function done(err, results) {
  var item = results[0];


  console.dir(item["3DLA"]);
}
```

##finding the cad file name
```node
var sifScanner = require("sif-scanner");
sifScanner("./sif/**.in", /^PN\=/, filter, done);

function filter(item) {
  return item.PN == "A19-HWB";
}

function done(err, results) {
  console.log(results[0]["3D"]);
}
```
