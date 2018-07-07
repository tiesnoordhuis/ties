const fs = require("fs");

var input = fs.readFile("input14.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    }
});

function doAll(x) {
  var input = x.split("\r\n");
  input.pop();
  var instructions = [];
  for (var i = 0; i < input.length; i++) {
    instructions[i] = [];
    for (var j = 0; j < input[i].length; j++) {
      instructions[i][j] = input[i][j];
    }
  }
  var instructionsMod = modifyInstructions(instructions);
  walkPath(instructionsMod);
}

function walkPath(instructions) {
  var beginPosition = findBeginPosition(instructions);
  var walker = { position: beginPosition, direction: "S", lettersSeen: ""};
  console.log(walker);
  console.log(instructions[walker.position[0]][walker.position[1]]);
  var lookingForLetters = true;
  var counter = 1;
  while (lookingForLetters) {
    counter ++;
    walker = doStep(walker, instructions);
    if (walker.lettersSeen.length > 9) {
      lookingForLetters = false;
    }
  }
  console.log(walker.lettersSeen);
  console.log("counter: " + counter);
}

function doStep(walker, instructions) {
  walker.position = calcNewPosition(walker);
  console.log(walker);
  console.log(instructions[walker.position[0]][walker.position[1]]);
  switch (instructions[walker.position[0]][walker.position[1]]) {
    case "vert":
      walker.direction = goVert(walker);
      break;
    case "hori":
      walker.direction = goHori(walker);
      break;
    case "cros":
      walker.direction = goCros(walker, instructions);
      break;
    default:
      walker = goOverLetter(walker, instructions);
      break;
  }
  return walker;
}

function goOverLetter(walker, instructions) {
  walker.lettersSeen += instructions[walker.position[0]][walker.position[1]][1];
  return walker;
}

function goCros(walker, instructions) {
  var oldPosition = [walker.position[0], walker.position[1]];
  switch (walker.direction) {
    case "S":
      if (instructions[oldPosition[0]][(oldPosition[1] - 1)] != "vert" && instructions[oldPosition[0]][(oldPosition[1] - 1)] != 0) {
        return "W";
      } else {
        return "E";
      }
      break;
    case "N":
      if (instructions[oldPosition[0]][(oldPosition[1] - 1)] != "vert" && instructions[oldPosition[0]][(oldPosition[1] - 1)] != 0) {
        return "W";
      } else {
        return "E";
      }
      break;
    case "E":
      if (instructions[(oldPosition[0] - 1)][oldPosition[1]] != "hori" && instructions[(oldPosition[0] - 1)][oldPosition[1]] != 0) {
        return "N";
      } else {
        return "S";
      }
      break;
    case "W":
    if (instructions[(oldPosition[0] - 1)][oldPosition[1]] != "hori" && instructions[(oldPosition[0] - 1)][oldPosition[1]] != 0) {
      return "N";
    } else {
      return "S";
    }
      break;
    default:
      console.error("unkown direction: " + walker.direction);
  }
}

function goVert(walker) {
  return walker.direction;
}

function goHori(walker) {
  return walker.direction;
}

function calcNewPosition(walker) {
  var oldPosition = [walker.position[0], walker.position[1]];
  var returnArray = [];
  switch (walker.direction) {
    case "S":
      returnArray = [(oldPosition[0] + 1), oldPosition[1]];
      break;
    case "N":
      returnArray = [(oldPosition[0] - 1), oldPosition[1]];
      break;
    case "E":
      returnArray = [oldPosition[0], (oldPosition[1] + 1)];
      break;
    case "W":
      returnArray = [oldPosition[0], (oldPosition[1] - 1)];
      break;
    default:
      console.error("unkown direction: " + walker.direction);
  }
  return [returnArray[0], returnArray[1]];
}

function findBeginPosition(instructions) {
  var topLine = instructions[0].slice();
  var returnArray = [];
  topLine.forEach((element, index) => {
    if (element === "vert") {
      returnArray = [0, index];
      console.log("begin found at position: " + index);
    }
  })
  return returnArray;
}

function modifyInstructions(instructions) {
  var returnArray = [];
  for (var i = 0; i < instructions.length; i++) {
    returnArray[i] = [];
    instructions[i].forEach((instruction, index) => {
      returnArray[i][index] = selectModify(instruction);
    })
  }
  return returnArray;
}

function selectModify(instruction) {
  switch (instruction) {
    case (" "): {
      return 0;
      break;
    }
    case ("-"): {
      return "hori";
      break;
    }
    case ("|"): {
      return "vert";
      break;
    }
    case ("+"): {
      return "cros";
      break;
    }
    default: {
      if (instruction.match(/^[A-Z]$/)) {
        console.log("regex test: " + instruction);
        return ["letr", instruction];
      } else {
        console.error("instruction not found: " + instruction);
      }
      break;
    }
  }
}
