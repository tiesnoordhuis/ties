const fs = require("fs");

var input = fs.readFile("input12.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    }
});

function doAll(x) {
  var dancers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
  if (dancers.length != 16) {
    console.log("dancers ini wrong length");
  }
  var dancemoves = [];
  var input = x.split(",");
  input.pop();
  for (var i = 0; i < input.length; i++) {
    dancemoves[i] = [];
    dancemoves[i][0] = input[i].slice(0, 1);
    dancemoves[i][1] = input[i].slice(1);
    //console.log(dancemoves[i]);
  }
  for (var i = 0; i < dancemoves.length; i++) {
    switch (dancemoves[i][0]) {
      case "s":
        console.log("doe spin");
        break;
      case "x":
        console.log("doe exchange");
        break;
      case "p":
        console.log("doe partner");
        break;
      default:
        console.log("unkown case");
        console.log("op positie: " + i);
        console.log("met instructie: " + dancemoves[i]);
    }
  }
}
