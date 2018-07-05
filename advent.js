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
  var input = x.split("\n");
  input.pop();
  var instructions = [];
  for (var i = 0; i < input.length; i++) {
    instructions[i] = input[i].split(" ");
  }
  var registers0 = iniRegisters(instructions, 0);
  var registers1 = iniRegisters(instructions, 1);
  console.log(registers0);
  console.log(registers1);
  doSimultaneous(registers0, registers1, instructions);
}

function doSimultaneous(registers0, registers1, instructions) {
  var ongoing = true;
  var calcArrays = [];
  calcArrays[0] = [];
  calcArrays[1] = [];
  calcArrays[2] = true;
  calcArrays[3] = 0;
  calcArrays[4] = 0;
  var currentPosistionP0 = 0;
  var currentPosistionP1 = 0;
  var sendQueP0 = [];
  var sendQueP1 = [];
  var activeProgram = 0;
  var sendNP1 = 0;
  while (ongoing) {
    calcArrays = doInstruction(registers0, registers1, instructions, currentPosistionP0, currentPosistionP1, sendQueP0, sendQueP1, activeProgram, sendNP1);
    ongoing = calcArrays[2];
    activeProgram = calcArrays[3];
    sendNP1 = calcArrays[4]
    currentPosistionP0 = calcArrays[0][0];
    currentPosistionP1 = calcArrays[1][0];
    registers0 = calcArrays[0][1];
    registers1 = calcArrays[1][1];
    sendQueP0 = calcArrays[0][2];
    sendQueP1 = calcArrays[1][2];
    console.log(currentPosistionP0);
    console.log(currentPosistionP1);
    console.log(" sendNP1: " + sendNP1);
  }
}

function doInstruction(registers0, registers1, instructions, currentPosistionP0, currentPosistionP1, sendQueP0, sendQueP1, activeProgram, sendNP1) {
  var ongoing = true;
  var returnArray = [];
  var valueX;
  var valueY;
  if (activeProgram === 0) {
    var registersNames = [];
    var registersValues = [];
    for (var i = 0; i < registers0.length; i++) {
      registersNames[i] = registers0[i][0];
      registersValues[i] = registers0[i][1];
    }
    var instruction = instructions[currentPosistionP0].slice();
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
        sendQueP0.push(valueX);
        currentPosistionP0 ++;
        break;
      }
      case "set": {
        registers0[registersNames.indexOf(instruction[1])][1] = valueY;
        currentPosistionP0 ++;
        break;
      }
      case "add": {
        registers0[registersNames.indexOf(instruction[1])][1] += valueY;
        currentPosistionP0 ++;
        break;
      }
      case "mul": {
        registers0[registersNames.indexOf(instruction[1])][1] = valueX * valueY;
        currentPosistionP0 ++;
        break;
      }
      case "mod": {
        registers0[registersNames.indexOf(instruction[1])][1] = valueX % valueY;
        currentPosistionP0 ++;
        break;
      }
      case "rcv": {
        if (sendQueP1.length < 1) {
          activeProgram = 1;
        } else {
          registers0[registersNames.indexOf(instruction[1])][1] = sendQueP1.shift();
          currentPosistionP0 ++;
        }
        break;
      }
      case "jgz": {
        if (valueX > 0) {
          currentPosistionP0 += valueY;
          break;
        } else {
          currentPosistionP0 ++;
          break;
        }
      }
      default: {
        console.log("iets fout gegaan in switch");
      }
    }
  } else if (activeProgram === 1) {
    var registersNames = [];
    var registersValues = [];
    for (var i = 0; i < registers1.length; i++) {
      registersNames[i] = registers1[i][0];
      registersValues[i] = registers1[i][1];
    }
    var instruction = instructions[currentPosistionP1].slice();
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
        sendQueP1.push(valueX);
        currentPosistionP1 ++;
        sendNP1 ++;
        break;
      }
      case "set": {
        registers1[registersNames.indexOf(instruction[1])][1] = valueY;
        currentPosistionP1 ++;
        break;
      }
      case "add": {
        registers1[registersNames.indexOf(instruction[1])][1] += valueY;
        currentPosistionP1 ++;
        break;
      }
      case "mul": {
        registers1[registersNames.indexOf(instruction[1])][1] = valueX * valueY;
        currentPosistionP1 ++;
        break;
      }
      case "mod": {
        registers1[registersNames.indexOf(instruction[1])][1] = valueX % valueY;
        currentPosistionP1 ++;
        break;
      }
      case "rcv": {
        if (sendQueP0.length < 1) {
          activeProgram = 0;
        } else {
          registers1[registersNames.indexOf(instruction[1])][1] = sendQueP0.shift();
          currentPosistionP1 ++;
        }
        break;
      }
      case "jgz": {
        if (valueX > 0) {
          currentPosistionP1 += valueY;
          break;
        } else {
          currentPosistionP1 ++;
          break;
        }
      }
      default: {
        console.log("iets fout gegaan in switch");
      }
    }
  }
  returnArray[0] = [currentPosistionP0, registers0, sendQueP0];
  returnArray[1] = [currentPosistionP1, registers1, sendQueP1];
  returnArray[2] = ongoing;
  returnArray[3] = activeProgram;
  returnArray[4] = sendNP1;
  return returnArray;
}

function doInstructionOld(registers, instruction, currentPosistion, soundPlayed) {
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

function iniRegisters(instructions, programN) {
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
    if (returnArray[i] === "p") {
      returnArray[i] = [returnArray[i], programN]
    } else {
      returnArray[i] = [returnArray[i], 0];
    }
  }
  return returnArray;
}
