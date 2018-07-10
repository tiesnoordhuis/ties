const fs = require("fs");

var input = fs.readFile("input16.txt", "utf8", (err, data) => {
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
  console.log(input);
  const rules2 = buildRules2Object(input);
  const rules3 = buildRules3Object(input);
  console.log(rules2);
  //console.log(rules3);
}

function buildRules2Object(input) {
  var returnArray = [];
  var temp = [];
  for (var i = 0; i < 6; i++) {
    temp = input[i].split(" => ");
    temp[0] = temp[0].split("/");
    temp[1] = temp[1].split("/");
    temp[0][0] = temp[0][0].split("");
    temp[0][1] = temp[0][1].split("");
    temp[1][0] = temp[1][0].split("");
    temp[1][1] = temp[1][1].split("");
    temp[1][2] = temp[1][2].split("");
    returnArray[i] = { rule: i, input: temp[0], output: temp[1]};
    returnArray[i].input = extendInputs2(returnArray[i].input);
  }
  return returnArray;
}

function extendInputs2(singleInput) {
  var rotatedInputs2 = rotateInputs2(singleInput);
  var flippedInputs2 = flipInputs2(singleInput);
  var returnArray = [singleInput, rotatedInputs2[0], rotatedInputs2[1], rotatedInputs2[2], flippedInputs2[0], flippedInputs2[1]];
  return returnArray;
}

function rotateInputs2(singleInput) {
  var rotate1 = [];
  rotate1[0] = [singleInput[1][0], singleInput[0][0]];
  rotate1[1] = [singleInput[1][1], singleInput[0][1]];
  var rotate2 = [];
  rotate2[0] = [singleInput[1][1], singleInput[1][0]];
  rotate2[1] = [singleInput[0][1], singleInput[0][0]];
  var rotate3 = [];
  rotate3[0] = [singleInput[0][1], singleInput[1][1]];
  rotate3[1] = [singleInput[0][0], singleInput[1][0]];
  return [rotate1, rotate2, rotate3];
}

function flipInputs2(singleInput) {
  var flipHori = [];
  flipHori[0] = singleInput[1];
  flipHori[1] = singleInput[0];
  var flipVerti = [];
  flipVerti[0] = [singleInput[0][1], singleInput[0][0]];
  flipVerti[1] = [singleInput[1][1], singleInput[1][0]];
  return [flipHori, flipVerti];
}

function buildRules3Object(input) {
  var rulesConstruct = input.slice(6);
  var returnArray = [];
  var temp = [];
  for (var i = 0; i < rulesConstruct.length; i++) {
    temp = rulesConstruct[i].split(" => ");
    temp[0] = temp[0].split("/");
    temp[1] = temp[1].split("/");
    returnArray[i] = { rule: i, input: temp[0], output: temp[1]};
  }
  return returnArray;
}
