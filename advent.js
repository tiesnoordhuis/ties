const fs = require("fs");

var input = fs.readFile("input7.txt", "utf8", (err, data) => {
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
  var list = x;
  console.log(list);
  var list2 = [];
  var calcString = "";
  var currentLevel = 0;
  var inGarbage = false;
  var endGarbage = false;
  var isIgnored = false;
  var stepResponse = [];
  var scoreResponse = [];
  var score = 0;
  var level = 0;
  for (var i = 0; i < list.length; i++) {
    list2.push(list[i]);
  }
  for (var i = 0; i < list2.length; i++) {
    stepResponse = doStep(list2[i], i, inGarbage, isIgnored);
    inGarbage = stepResponse[0];
    endGarbage = stepResponse[1];
    isIgnored = stepResponse[2];
    console.log("input:");
    console.log(list2[i]);
    console.log("output");
    console.log(stepResponse);
    if (inGarbage == false && endGarbage == false) {
      console.log("added");
      calcString += list2[i];
    }
    console.log("");
  }
  console.log(calcString);
  for (var i = 0; i < calcString.length; i++) {
    scoreResponse = calcScore(calcString[i], level, score);
    score = scoreResponse[0];
    level = scoreResponse[1];
  }
}

function calcScore(currentChar, level, score) {
  if (currentChar == "{") {

  } else if (currentChar == "}") {

  } else if (currentChar == ",") {

  } else {
    console.log("ERROR");
  }
}

function doStep(currentChar, i, inGarbage, isIgnored) {
  var returnArray = [false, false, false];
  var ignoreArray = [true, false, false];
  if (inGarbage == false) {
    if (currentChar == "<") {
      returnArray[0] = true;
    } else {
      returnArray[0] = false;
    }
  } else if (inGarbage == true) {
    if (isIgnored == true) {
      return ignoreArray;
    } else if (currentChar == "!") {
      returnArray[0] = true;
      returnArray[2] = true;
    } else if (currentChar == ">") {
      returnArray[0] = false;
      returnArray[1] = true;
    } else {
      returnArray[0] = true;
    }
  }
  return returnArray;
}
