const fs = require("fs");

var x;

var input = fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
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
    console.log(xSplit);
    xSplit.sort(function(a, b){return a-b});
    var xSplitLength = Number(xSplit.length) - 1;
    sum += Number(xSplit[xSplitLength] - xSplit[0]);
    console.log(sum);
  }
  console.log(x.length);
  console.log("sum: \n" + sum);
  //console.log("log: \n" + x);
}
