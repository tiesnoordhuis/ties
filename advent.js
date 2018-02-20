const fs = require("fs");

var input = fs.readFile("input3.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    return x;
    }
});

var x;

function doAll(x) {
  var valid = 512;
  x = x.split("\n");
  x.pop();
  for (var i = 0; i < x.length; i++) {
    var testFail = 0
    x[i] = x[i].split(" ");
    var testCases = [];
    for (var j = 0; j < x[i].length; j++) {
      testCases[j] = x[i][j].split("");
      testCases[j] = testCases[j].sort().join("");
    }
    for (var k = 0; k < x[i].length; k++) {
      for (var l = 0; l < x[i].length; l++) {
        var testValue = x[i][k].split("");
        testValue = testValue.sort().join("");
        if (testValue == testCases[l] && k != l) {
          testFail = 1;
          console.log(x[i]);
        }
      }
    }
    if (testFail == 1) {
      valid --;
      console.log(valid);
    }
  }
}
