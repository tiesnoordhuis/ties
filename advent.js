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
  var garbageString = "";
  var garbageN = 0;
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
  for (var i = 0; i < (list2.length - 1); i++) {
    stepResponse = doStep(list2[i], i, inGarbage, isIgnored, garbageN);
    inGarbage = stepResponse[0];
    endGarbage = stepResponse[1];
    isIgnored = stepResponse[2];
	garbageN = stepResponse[3];
    if (inGarbage == false && endGarbage == false) {
      calcString += list2[i];
    } else {
		if (isIgnored == false && stepResponse.length == 4) {
			garbageString += list2[i];
		}
	}
  }
  console.log(calcString);
  console.log(garbageString);
  for (var i = 0; i < calcString.length; i++) {
    scoreResponse = calcScore(calcString[i], level, score);
    score = scoreResponse[0];
    level = scoreResponse[1];
  }
  console.log(score);
  var scoreGarbage = countGarbage(garbageString);
  console.log(scoreGarbage);
  console.log(garbageN);
  var scoreGarbage = scoreGarbage - (2 * garbageN);
  console.log(scoreGarbage);
}

function countGarbage(garbageString) {
	var scoreGarbage = 0;
	for (var i = 0; i < garbageString.length; i++) {
		scoreGarbage ++;
	}
	return scoreGarbage;
}

function calcScore(currentChar, level, score) {
	var returnArray = [score, level];
  if (currentChar == "{") {
	level ++;
	score += level;
  } else if (currentChar == "}") {
	level --;
  } else if (currentChar == ",") {

  } else {
    console.log("ERROR");
	console.log(currentChar);
  }
  returnArray = [score, level];
  return returnArray;
}

function doStep(currentChar, i, inGarbage, isIgnored, garbageN) {
  var returnArray = [false, false, false, garbageN];
  var ignoreArray = [true, false, false, garbageN, true];
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
	  garbageN ++;
	  returnArray[3] = garbageN;
    } else {
      returnArray[0] = true;
    }
  }
  return returnArray;
}
