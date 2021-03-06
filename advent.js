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
  var input = x.split("\r\n");
  input.pop();
  //console.log(input);
  const rules2 = buildRules2Object(input);
  console.log("rules 2 :");
  console.log(rules2);
  const rules3 = buildRules3Object(input);
  console.log("rules 3 : ");
  console.log(rules3);
  const startGrid = [[".", "#", "."], [".", ".", "#"], ["#", "#", "#"]];
  var grid = startGrid;
  console.log("startGrid: ");
  console.log(grid);
  const iterationsN = 5;
  for (var iteration = 0; iteration < iterationsN; iteration++) {
    console.log("iterationsN loop grid: " + grid);
    grid = makeNextGrid(grid, rules2, rules3);
  }
}

function makeNextGrid(grid, rules2, rules3) {
  var sizeGrid = calcSizeGrid(grid);
  var sizeCatagory = selectCatagory(sizeGrid);
  console.log("sizeGrid: " + sizeGrid + " , " + sizeCatagory);
  if (needsSplitting(sizeGrid, sizeCatagory)) {
    grid = splitGrid(grid, sizeCatagory);
  } else {
    grid = [grid];
  }
  console.log("makeNextGrid: ");
  console.log(grid);
  if (sizeCatagory === 2) {
    for (var i = 0; i < grid.length; i++) {
      grid[i] = enhanceGrid2(grid[i], rules2);
    }
  } else if (sizeCatagory === 3) {
    for (var i = 0; i < grid.length; i++) {
      grid[i] = enhanceGrid3(grid[i], rules3);
    }
  }
  console.log("after enhance: ");
  console.log(grid);
  grid = normalizeGrid(grid, sizeGrid, sizeCatagory);
  return grid;
}

function normalizeGrid(grid, sizeCatagory) {
  var returnArray = [];
  if (sizeCatagory === 2) {
    returnArray = normalizeGrid3(grid);
    return returnArray;
  }
  returnArray = normalizeGrid2(grid);
  return returnArray;
}

function normalizeGrid2(grid) {
  if (grid.length === 1) {
    grid = grid[0];
  }
}

function normalizeGrid3(grid) {
  if (grid.lenght === 1) {
    grid = grid[0];
  }
  var returnArray = [];
  var totalGrids = grid.length;
  var sizeGrid = Math.sqrt(totalGrids);
  for (var row = 0; row < sizeGrid; row++) {
    var buildRow1 = row * 3;
    returnArray[buildRow1] = [];
    for (var i = 0; i < sizeGrid; i++) {
      returnArray[buildRow1].push()
    }

  }
}

function enhanceGrid2(gridPart, rules2) {
  var gridpartCompare = gridPart[0].concat(gridPart[1])
  for (var i = 0; i < rules2.length; i++) {
    for (var inputs = 0; inputs < 8; inputs++) {
      var compare = rules2[i].input[inputs];
      compare = compare[0].concat(compare[1]);
      if (compare.every((v, i) => v === gridpartCompare[i])) {
        console.log("match found");
        return rules2[i].output;
      }
    }
  }
  console.error("no match found");
}

function enhanceGrid3(gridPart, rules3) {
  var gridpartCompare = gridPart[0].concat(gridPart[1], gridPart[2])
  for (var i = 0; i < rules3.length; i++) {
    for (var inputs = 0; inputs < 8; inputs++) {
      var compare = rules3[i].input[inputs];
      compare = compare[0].concat(compare[1], compare[2]);
      if (compare.every((v, i) => v === gridpartCompare[i])) {
        console.log("match found");
        return rules3[i].output;
      }
    }
  }
  console.error("no match found");
}

function splitGrid(grid, sizeCatagory) {
  if (sizeCatagory === 2) {
    return splitGridCatagory2(grid);
  }
  return splitGridCatagory3(grid);
}

function splitGridCatagory3(grid) {
  var returnArray = [];
  var splitN = grid[0].length / 3;
  console.log("splitN: " + splitN);
  for (var gridRow = 0; gridRow < splitN; gridRow ++) {
    var buildGrid = [];
    for (var gridColumn = 0; gridColumn < splitN; gridColumn++) {
      buildGrid[0] = [grid[gridRow * 3][gridColumn * 3], grid[gridRow * 3][gridColumn * 3 + 1], grid[gridRow * 3][gridColumn * 3 + 2]];
      buildGrid[1] = [grid[gridRow * 3 + 1][gridColumn * 3], grid[gridRow * 3 + 1][gridColumn * 3 + 1], grid[gridRow * 3 + 1][gridColumn * 3 + 2]];
      buildGrid[2] = [grid[gridRow * 3 + 2][gridColumn * 3], grid[gridRow * 3 + 2][gridColumn * 3 + 1], grid[gridRow * 3 + 2][gridColumn * 3 + 2]];
      returnArray.push(buildGrid.slice());
    }
  }
  console.log("new grid: " + returnArray);
  return returnArray;
}

function splitGridCatagory2(grid) {
  var returnArray = [];
  var splitN = grid[0].length / 2;
  console.log("splitN: " + splitN);
  for (var gridRow = 0; gridRow < splitN; gridRow ++) {
    for (var gridColumn = 0; gridColumn < splitN; gridColumn++) {
      returnArray.push([[grid[gridRow * 2][gridColumn * 2], grid[gridRow * 2][gridColumn * 2 + 1]][grid[gridRow * 2 + 1][gridColumn * 2], grid[gridRow * 2 + 1][gridColumn * 2 + 1]]]);
    }
  }
  console.log("new grid: " + returnArray);
  return returnArray;
}

function needsSplitting(sizeGrid, sizeCatagory) {
  console.log("needsSplitting?");
  if (sizeGrid === sizeCatagory) {
    console.log("false");
    return false;
  }
  console.log("true");
  return true;
}

function selectCatagory(sizeGrid) {
  if (sizeGrid % 2 === 0) {
    return 2;
  }
  return 3;
}

function calcSizeGrid(grid) {
  return grid[0].length;
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
  var returnArray = [singleInput, rotatedInputs2[0], rotatedInputs2[1], rotatedInputs2[2], flippedInputs2[0], flippedInputs2[1], flippedInputs2[2], flippedInputs2[3]];
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
  var extraInputs = rotateInputs2(flipHori);
  return [flipHori, extraInputs[0], extraInputs[1], extraInputs[2]];
}

function buildRules3Object(input) {
  var rulesConstruct = input.slice(6);
  var returnArray = [];
  var temp = [];
  for (var i = 0; i < rulesConstruct.length; i++) {
    temp = rulesConstruct[i].split(" => ");
    temp[0] = temp[0].split("/");
    for (var j = 0; j < temp[0].length; j++) {
      temp[0][j] = temp[0][j].split("");
    }
    temp[1] = temp[1].split("/");
    for (var j = 0; j < temp[1].length; j++) {
      temp[1][j] = temp[1][j].split("");
    }
    returnArray[i] = { rule: i, input: temp[0], output: temp[1]};
    returnArray[i].input = extendInputs3(returnArray[i].input);
  }
  return returnArray;
}

function extendInputs3(singleInput) {
  var rotatedInputs3 = rotateInputs3(singleInput);
  var flippedInputs3 = flipInputs3(singleInput);
  var returnArray = [singleInput, rotatedInputs3[0], rotatedInputs3[1], rotatedInputs3[2], flippedInputs3[0], flippedInputs3[1], flippedInputs3[2], flippedInputs3[3]];
  return returnArray;
}

function rotateInputs3(singleInput) {
  var rotate1 = [];
  rotate1[0] = [singleInput[2][0], singleInput[1][0], singleInput[0][0]];
  rotate1[1] = [singleInput[2][1], singleInput[1][1], singleInput[0][1]];
  rotate1[2] = [singleInput[2][2], singleInput[1][2], singleInput[0][2]];
  var rotate2 = [];
  rotate2[0] = [rotate1[2][0], rotate1[1][0], rotate1[0][0]];
  rotate2[1] = [rotate1[2][1], rotate1[1][1], rotate1[0][1]];
  rotate2[2] = [rotate1[2][2], rotate1[1][2], rotate1[0][2]]
  var rotate3 = [];
  rotate3[0] = [rotate2[2][0], rotate2[1][0], rotate2[0][0]];
  rotate3[1] = [rotate2[2][1], rotate2[1][1], rotate2[0][1]];
  rotate3[2] = [rotate2[2][2], rotate2[1][2], rotate2[0][2]]
  return [rotate1, rotate2, rotate3];
}

function flipInputs3(singleInput) {
  var flipHori = [];
  flipHori[0] = singleInput[2];
  flipHori[1] = singleInput[1];
  flipHori[2] = singleInput[0];
  var extraInputs = rotateInputs3(flipHori);
  return [flipHori, extraInputs[0], extraInputs[1], extraInputs[2]];
}
