const fs = require("fs");

var x;

var input = fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    console.log(x);
    doAll(x);
    return x;
    }
});



function doAll(x) {
  x = x.split("\n");
  x.pop();
  var sum = 0;
  for (var i = 0; i < x.length; i++) {
    var xSplit = x[i].split("\t");
    xSplit.sort(function(a, b){return b - a});
    console.log(xSplit);
    var xSplitLength = Number(xSplit.length);
    console.log("xSplitLength= " + xSplitLength);
    for (var j = 0; j < xSplitLength; j++) {
      for (var k = 0; k < xSplitLength; k++) {
        var divNumber = Number(xSplit[j]/xSplit[k]);
        console.log(divNumber);
        if (Number.isInteger(divNumber) && j != k) {
          sum += xSplit[j]/xSplit[k];
          console.log(xSplit[j] + " " + xSplit[k]);
          console.log(sum);
        }
      }
    }
  }
  console.log("sum: \n" + sum);
  //console.log("log: \n" + x);
}
