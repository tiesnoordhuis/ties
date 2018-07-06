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
  var input = x.split("\n");
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
