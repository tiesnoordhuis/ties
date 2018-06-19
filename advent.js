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
  console.log(dancers.join(""));
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
  var buildingCompacted = [];
  buildingCompacted[0] = [false];
  console.log(buildingCompacted);
    for (var i = 0; i < dancemoves.length; i++) {
      var dancemovesSingle = dancemoves[i][0];
      console.log(dancemovesSingle);
      //buildingCompacted = checkBegining(i, dancers, dancemovesSingle, buildingCompacted);
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
        }
        case "p": {
          var compactEnd = true;
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
        }
        //buildingCompacted = checkEnding(i, dancers, dancemovesSingle, buildingCompacted);
      }
      console.log(dancers);
    }
  console.log(dancers.join(""));
  for (var i = 0; i < dancersRef.length; i++) {
    dancersRef[i]
  }
}

function checkBegining(i, dancers, dancemovesSingle, buildingCompacted) {
  var returnArray = [];
  if (buildingCompacted[0][0]) {
    returnArray[0] = [true];
    return returnArray;
  } else if (dancemovesSingle === "p") {
    returnArray[0] = [false];
    return returnArray;
  } else {
    returnArray[0] = [true];
    console.log(i);
    console.log(dancers);
    return returnArray;
  }
}

function checkEnding(i, dancers, dancemovesSingle, buildingCompacted) {
  var returnArray = [];
  if (buildingCompacted[0][0]) {
    if (dancemovesSingle === "p") {
      console.log(i);
      console.log(dancers);
      returnArray[0] = [false];
    } else {
      returnArray[0] = [true];
    }
    return returnArray
  } else {
    returnArray[0] = [false];
    return returnArray;
  }
}
