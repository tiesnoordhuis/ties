const fs = require("fs");

var input = fs.readFile("input9.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    }
});

function doAll(x) {
  var input = x.split(",");
  input[(input.length - 1)] = "se";
  var nAxis = 0;
  var nwAxis = 0;
  var neAxis = 0;
  var maxSteps = 0;
  var currentSteps = 0;
  for (var i = 0; i < input.length; i++) {
    var stepArray = doStep(input[i]);
    nAxis += stepArray[0];
    nwAxis += stepArray[1];
    neAxis += stepArray[2];
    currentSteps = distanceToPoint(nAxis, nwAxis, neAxis);
    if (currentSteps > maxSteps) {
      maxSteps = currentSteps;
    }
  }
  console.log(nAxis);
  console.log(nwAxis);
  console.log(neAxis);
  var distanceAnswer = distanceToPoint(nAxis, nwAxis, neAxis);
  console.log(maxSteps);
}

function distanceToPoint(nAxis, nwAxis, neAxis) {
  var middleAxis = 0;
  var leftAxis = 0;
  var rightAxis = 0;
  if (nAxis >= 0 ) {
    if (nwAxis >= 0) {
      if (neAxis >= 0) {
        middleAxis = nAxis;
        leftAxis = nwAxis;
        rightAxis = neAxis;
      } else if (neAxis < 0) {
        middleAxis = nwAxis;
        leftAxis = neAxis;
        rightAxis = nAxis;
      }
    } else if (nwAxis < 0) {
      if (neAxis >= 0) {
        middleAxis = neAxis;
        leftAxis = nAxis;
        rightAxis = nwAxis;
      } else if (neAxis < 0) {
        return specialCase(nAxis, nwAxis, neAxis);
      }
    }
  } else if (nAxis < 0) {
    if (nwAxis >= 0) {
      if (neAxis >= 0) {
        return specialCase(nAxis, nwAxis, neAxis);
      } else if (neAxis < 0) {
        middleAxis = neAxis;
        leftAxis = nAxis;
        rightAxis = nwAxis;
      }
    } else if (nwAxis < 0) {
      if (neAxis >= 0) {
        middleAxis = nwAxis;
        leftAxis = neAxis;
        rightAxis = nAxis;
      } else if (neAxis < 0) {
        middleAxis = nAxis;
        leftAxis = nwAxis;
        rightAxis = neAxis;
      }
    }
  }
  middleAxis = Math.abs(middleAxis);
  leftAxis = Math.abs(leftAxis);
  rightAxis = Math.abs(rightAxis);
  if (leftAxis < rightAxis) {
    return (middleAxis + rightAxis);
  } else if (rightAxis <= leftAxis) {
    return (middleAxis + leftAxis);
  }
}

function specialCase(nAxis, nwAxis, neAxis) {
  var sortArray = [Math.abs(nAxis), Math.abs(nwAxis), Math.abs(neAxis)];
  sortArray.sort(compare);
  var ans = sortArray[2] - sortArray[0]
  return ans;
}

function compare(a, b) {
  return a - b;
}

function doStep(direction) {
  var returnArray = [0, 0, 0];
  if (direction === "n") {
    returnArray[0] = 1;
  } else if (direction === "s") {
    returnArray[0] = -1;
  } else if (direction === "nw") {
    returnArray[1] = 1;
  } else if (direction === "se") {
    returnArray[1] = -1;
  } else if (direction === "ne") {
    returnArray[2] = 1;
  } else if (direction === "sw") {
    returnArray[2] = -1;
  } else {
    console.log("error");
    console.log(direction);
  }
  return returnArray;
}
