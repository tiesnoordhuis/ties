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
  //input.pop();
  for (var i = 0; i < input.length; i++) {
    dancemoves[i] = [];
    dancemoves[i][0] = input[i].slice(0, 1);
    dancemoves[i][1] = input[i].slice(1);
    //console.log(dancemoves[i]);
  }
  for (var l = 0; l < 1000000000; l++) {
    console.log(l);
    for (var i = 0; i < dancemoves.length; i++) {
      switch (dancemoves[i][0]) {
        case "s": {
          //console.log("doe spin");
          //console.log(dancers.join());
          let n = dancemoves[i][1];
          //console.log(" spin doen met " + n);
          let end = dancers.slice(-n);
          for (var j = 0; j < n; j++) {
            dancers.pop();
          }
          dancers = end.concat(dancers);
          break;
        }
        case "x": {
          //console.log("doe exchange");
          //console.log(dancers.join());
          let n = dancemoves[i][1].split("/");
          n[0] = Number(n[0]);
          n[1] = Number(n[1]);
          //console.log("exchange met values " + n);
          let temp = dancers[n[0]];
          dancers.splice(n[0], 1, dancers[n[1]]);
          dancers.splice(n[1], 1, temp);
          break;
        }
        case "p": {
          //console.log("doe partner");
          //console.log(dancers.join());
          let n = dancemoves[i][1].split("/");
          //console.log("met  parteners " + n);
          n[0] = dancers.findIndex((dancer) => {
            return n[0] == dancer;
          });
          n[1] = dancers.findIndex((dancer) => {
            return n[1] == dancer;
          });
          let temp = dancers[n[0]];
          dancers.splice(n[0], 1, dancers[n[1]]);
          dancers.splice(n[1], 1, temp);
          break;
        }
        default: {
          console.log("unkown case");
          console.log("op positie: " + i);
          console.log("met instructie: " + dancemoves[i]);
        }
      }
    }
  }
  console.log(dancers.join(""));
}
