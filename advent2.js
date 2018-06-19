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

var compact = [];

function doAll(x) {
  var dancers = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
  console.log(dancers.join(""));
  var input = x.split(",");
  var dancemoves = makeDancemoves(input);
  var dancersRef = []
  for (var cycle = 0; cycle < array.length; cycle++) {
    dancersRef[cycle] = dancers.slice();
    for (var i = 0; i < dancemoves.length; i++) {
      dancers = doDancemove(dancers, dancemoves[i]);
      console.log(dancers.join(""));
      console.log(compact);
    }
    console.log(dancers.join(""));
  }
}

function doDancemove(dancers, dancemovesSingle) {
  compact[0] = [true];
  if (dancemovesSingle[0] === "s") {
    let n = dancemovesSingle[1];
    //console.log(" spin doen met " + n);
    let end = dancers.slice(-n);
    for (var j = 0; j < n; j++) {
      dancers.pop();
    }
    dancers = end.concat(dancers);
    return dancers;
  } else if (dancemovesSingle[0] === "x") {
    let n = dancemovesSingle[1].split("/");
    n[0] = Number(n[0]);
    n[1] = Number(n[1]);
    //console.log("exchange met values " + n);
    let temp = dancers[n[0]];
    dancers.splice(n[0], 1, dancers[n[1]]);
    dancers.splice(n[1], 1, temp);
    return dancers;
  } else if (dancemovesSingle[0] === "p") {
    let n = dancemovesSingle[1].split("/");
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
    return dancers;
  } else {
    console.log("foute input");
  }
}

function makeDancemoves(input) {
  var returnDancemoves = [];
  for (var i = 0; i < input.length; i++) {
    returnDancemoves[i] = [];
    returnDancemoves[i][0] = input[i].slice(0, 1);
    returnDancemoves[i][1] = input[i].slice(1);
  }
  return returnDancemoves
}
