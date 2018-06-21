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
  var input = x.split(",");
  var dancemoves = makeDancemoves(input);
  var dancersRef = [];
  for (var cycle = 0; cycle < 1000; cycle++) {
    dancersRef.push(dancers.slice().join(""));
    console.log(cycle);
    //console.log(dancersRef);
    for (var i = 0; i < dancemoves.length; i++) {
      dancers = doDancemove(dancers, dancemoves[i]);
      //console.log(dancers.join(""));
    }
    //console.log(dancers.join(""));
    var foundCycle = checkRef(cycle, dancersRef);
    console.log(foundCycle);
    if (foundCycle[0]) {
      calcCycles(foundCycle[1], dancersRef)
      break;
    }
  }
}

function calcCycles(completeCycle, dancersRef) {
  var leftover = 1000000000 % completeCycle;
  console.log(leftover);
  console.log(dancersRef[leftover]);
}

function checkRef(cycle, dancersRef) {
  var latest = dancersRef[(dancersRef.length - 1)];
  var index = dancersRef.findIndex((element) => {
    //console.log(element);
    return element == latest;
  });
  if (index === cycle) {
    return [false];
  } else if (index >= 0) {
    console.log(index);
    console.log(dancersRef[index]);
    console.log(cycle);
    console.log(dancersRef[cycle]);
    return [true, cycle];
  } else {
    return [false];
  }
}

function doDancemove(dancers, dancemovesSingle) {
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
