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
  }
  var totalGroups = 0;
  var connectedPrograms = [];
  while (list.length > 0) {
    connectedPrograms[0] = list[0][0];
    connectedPrograms = checkConnectionGroup(list, connectedPrograms);
    list = deleteGroupFromList(list, connectedPrograms);
    totalGroups ++;
  }
  console.log(totalGroups);
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

function checkConnectionGroup(list, connectedPrograms) {
  var checkLength = 0;
  while (checkLength < connectedPrograms.length) {
    checkLength = connectedPrograms.length;
    for (var i = 0; i < list.length; i++) {
      var checkArray = checkConnection(list[i], list, connectedPrograms);
      if (checkArray[0] && connectedPrograms.includes(checkArray[1]) === false) {
        connectedPrograms.push(checkArray[1]);
      }
    }
  }
  return connectedPrograms;
}

function deleteGroupFromList(list, connectedPrograms) {
  for (var i = 0; i < connectedPrograms.length; i++) {
    for (var j = 0; j < list.length; j++) {
      if (connectedPrograms[i] === list[j][0]) {
        list.splice(j, 1);
      }
    }
  }
  return list;
}
