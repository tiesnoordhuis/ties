const fs = require("fs");

var input = fs.readFile("input13.txt", "utf8", (err, data) => {
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
    instructions[i] = input[i].split(" ");
  }
  var registers = iniRegisters(instructions);
  console.log(registers);
  registers = doInstructions(registers, instructions);
}

function doInstruction(registers, instruction, currentPosistion, soundPlayed) {
  console.log("instruction: " + instruction);
  var registersNames = [];
  var registersValues = [];
  for (var i = 0; i < registers.length; i++) {
    registersNames[i] = registers[i][0];
    registersValues[i] = registers[i][1];
  }
  var ongoing = true;
  var returnArray = [];
  var valueX;
  var valueY;
  switch (instruction[0]) {
    case "snd": {
      if (isNaN(Number(instruction[1]))) {
        valueX = registersValues[registersNames.indexOf(instruction[1])];
      } else {
        valueX = Number(instruction[1]);
      }
      break;
    }
    case "set": {
      if (isNaN(Number(instruction[1]))) {
        valueX = registersValues[registersNames.indexOf(instruction[1])];
      } else {
        valueX = Number(instruction[1]);
      }
      if (isNaN(Number(instruction[2]))) {
        valueY = registersValues[registersNames.indexOf(instruction[2])];
      } else {
        valueY = Number(instruction[2]);
      }
      break;
    }
    case "add": {
      if (isNaN(Number(instruction[1]))) {
        valueX = registersValues[registersNames.indexOf(instruction[1])];
      } else {
        valueX = Number(instruction[1]);
      }
      if (isNaN(Number(instruction[2]))) {
        valueY = registersValues[registersNames.indexOf(instruction[2])];
      } else {
        valueY = Number(instruction[2]);
      }
      break;
    }
    case "mul": {
      if (isNaN(Number(instruction[1]))) {
        valueX = registersValues[registersNames.indexOf(instruction[1])];
      } else {
        valueX = Number(instruction[1]);
      }
      if (isNaN(Number(instruction[2]))) {
        valueY = registersValues[registersNames.indexOf(instruction[2])];
      } else {
        valueY = Number(instruction[2]);
      }
      break;
    }
    case "mod": {
      if (isNaN(Number(instruction[1]))) {
        valueX = registersValues[registersNames.indexOf(instruction[1])];
      } else {
        valueX = Number(instruction[1]);
      }
      if (isNaN(Number(instruction[2]))) {
        valueY = registersValues[registersNames.indexOf(instruction[2])];
      } else {
        valueY = Number(instruction[2]);
      }
      break;
    }
    case "rcv": {
      if (isNaN(Number(instruction[1]))) {
        valueX = registersValues[registersNames.indexOf(instruction[1])];
      } else {
        valueX = Number(instruction[1]);
      }
      break;
    }
    case "jgz": {
      if (isNaN(Number(instruction[1]))) {
        valueX = registersValues[registersNames.indexOf(instruction[1])];
      } else {
        valueX = Number(instruction[1]);
      }
      if (isNaN(Number(instruction[2]))) {
        valueY = registersValues[registersNames.indexOf(instruction[2])];
      } else {
        valueY = Number(instruction[2]);
      }
      break;
    }
  }
  switch (instruction[0]) {
    case "snd": {
      soundPlayed = valueX;
      console.log(soundPlayed);
      currentPosistion ++;
      break;
    }
    case "set": {
      registers[registersNames.indexOf(instruction[1])][1] = valueY;
      currentPosistion ++;
      break;
    }
    case "add": {
      registers[registersNames.indexOf(instruction[1])][1] += valueY;
      currentPosistion ++;
      break;
    }
    case "mul": {
      registers[registersNames.indexOf(instruction[1])][1] = valueX * valueY;
      currentPosistion ++;
      break;
    }
    case "mod": {
      registers[registersNames.indexOf(instruction[1])][1] = valueX % valueY;
      currentPosistion ++;
      break;
    }
    case "rcv": {
      if (valueX === 0) {
        currentPosistion ++;
        break;
      } else {
        ongoing = false;
        break;
      }
    }
    case "jgz": {
      if (valueX > 0) {
        currentPosistion += valueY;
        break;
      } else {
        currentPosistion ++;
        break;
      }
    }
    default: {
      console.log("iets fout gegaan in switch");
    }
  }
  returnArray[0] = ongoing;
  returnArray[1] = currentPosistion;
  returnArray[2] = registers;
  returnArray[3] = soundPlayed;
  return returnArray;
}

function doInstructions(registers, instructions) {
  var ongoing = true;
  var calcArray = [];
  var currentPosistion = 0;
  var soundPlayed = 0;
  while (ongoing) {
    calcArray = doInstruction(registers, instructions[currentPosistion], currentPosistion, soundPlayed);
    ongoing = calcArray[0];
    currentPosistion = calcArray[1];
    registers = calcArray[2];
    soundPlayed = calcArray[3];
  }
  console.log("output: " + soundPlayed);
  return registers;
}

function iniRegisters(instructions) {
  var returnArray = [];
  var registersLong = [];
  for (var i = 0; i < instructions.length; i++) {
    if (isNaN(Number(instructions[i][1]))) {
      registersLong.push(instructions[i][1]);
    }
  }
  returnArray = registersLong.filter((element, index, array) => {
    return index === array.indexOf(element);
  });
  for (var i = 0; i < returnArray.length; i++) {
    returnArray[i] = [returnArray[i], 0];
  }
  return returnArray;
}
