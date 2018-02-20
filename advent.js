const fs = require("fs");

var input = fs.readFile("input4.txt", "utf8", (err, data) => {
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
  var list = x.split("\n");
  list.pop();
  console.log(list);
  var stepCounter = 0;
  var currentPos = 0;
  while (currentPos >= 0 && currentPos < (x.length - 1)) {
    var returnValues = doNextStep(currentPos, list);
    currentPos = returnValues[0];
    list[returnValues[1]] = returnValues[2];
    stepCounter ++;
  }
  console.log(currentPos);
  console.log(list);
  console.log("step counter: " + stepCounter);
}

function doNextStep(currentPos, list) {
  var list = list;
  var currentPos = Number(currentPos);
  var stepsToTake = Number(list[currentPos]);
  var updateValue = 0;
  if ((stepsToTake) >= 3) {
    updateValue = stepsToTake - 1;
  } else if ((stepsToTake) < 3) {
    updateValue = stepsToTake + 1;
  }
  var nextPos = 0;
  nextPos = currentPos + stepsToTake;
  var returnValues = [0, 0, 0];
  returnValues[0] = nextPos;
  returnValues[1] = currentPos;
  returnValues[2] = updateValue;
  return returnValues;
}
