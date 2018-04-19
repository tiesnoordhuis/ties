const fs = require("fs");

var input = fs.readFile("input10.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    }
});

function doAll(x) {
  var input = x.split("\n");
  input.pop();
  var list = [];
  for (var i = 0; i < input.length; i++) {
    list[i] = input[i].split(" <-> ");
    list[i][1] = list[i][1].split(", ")
    list[i][0] = Number(list[i][0]);
    for (var j = 0; j < list[i][1].length; j++) {
      list[i][1][j] = Number(list[i][1][j]);
    }
    console.log(list[i]);
  }
  var connectedPrograms = [0];
  var checkLength = 0;
  while (checkLength < connectedPrograms.length) {
    checkLength = connectedPrograms.length;
    for (var i = 0; i < list.length; i++) {
      var checkArray = checkConnection(list[i], list, connectedPrograms);
      if (checkArray[0] && connectedPrograms.includes(checkArray[1]) === false) {
        connectedPrograms.push(checkArray[1]);
      }
    }
    console.log(connectedPrograms);
  }
  for (var i = 0; i < connectedPrograms.length; i++) {
    console.log(connectedPrograms[i]);
  }
  console.log(connectedPrograms.length);
}

function checkConnection(program, list, connectedPrograms) {
  var returnArray = [false, 0];
  for (var i = 0; i < program[1].length; i++) {
    for (var j = 0; j < connectedPrograms.length; j++) {
      if (program[1][i] === connectedPrograms[j]) {
        returnArray = [true, program[0]];
        return returnArray;
      }
    }
  }
  return returnArray;
}
