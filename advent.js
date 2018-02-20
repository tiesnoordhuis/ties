calcAll();

function gridNul() {
  var grid = [];
  grid[0] = [0, 0, 0, 1];
  var gridNamen = ["index van tile ", "index van circle ", "index van tile in circle ", "value van tile "];
  for (var i = 0; i < gridNamen.length; i++) {
    //console.log(gridNamen[i] + grid[0][i]);
  }
  return [grid, gridNamen] ;
}

function tilesInCircle(n) {
  if (n == 0) {
    return 1;
  } else {
    var circle = (n * 2) + 1;
    var squares = ((circle - 1) * 4);
    //console.log("loop squares: " + squares);
    return squares;
  }
}

function calcNext(grid) {
  var grid = grid
  var lastGrid = [];
  lastGrid = grid[grid.length - 1];
  //console.log("lastGrid: " + lastGrid);
  var newestGrid = [0, 0, 0, 0];
  newestGrid[0] = lastGrid[0] + 1;
  if (lastGrid[2] >= (tilesInCircle(lastGrid[1]) - 1)) {
    newestGrid[1] = lastGrid[1] + 1;
    newestGrid[2] = 0;
  } else {
    newestGrid[1] = lastGrid[1];
    newestGrid[2] = lastGrid[2] + 1;
  }
  var newestGridValue = 0;
  if (lastGrid[1] == (newestGrid[1] - 1)) {
    newestGridValue = lastGrid[3];
    if (lastGrid[1] >= 1) {
      var indexFirstCircle = lastGrid[0] - tilesInCircle(lastGrid[1]) + 1;
      newestGridValue += grid[indexFirstCircle][3];
    }
  } else if (newestGrid[2] == (tilesInCircle(newestGrid[1]) - 1)) {
    newestGridValue = lastGrid[3];
    var indexLastPreCircle = lastGrid[0] - tilesInCircle(lastGrid[1]) + 1;
    newestGridValue += grid[indexLastPreCircle][3];
    var indexFirstCircle = lastGrid[0] - tilesInCircle(lastGrid[1]) + 2;
    newestGridValue += grid[indexFirstCircle][3];
  } else if (true) {
    newestGridValue = lastGrid[3];
    var distToCorner = 0;
    var circleQuartersDist = tilesInCircle(newestGrid[1])/4;
    var circleQuarters = [0, 0, 0, 0];
    for (var i = 0; i < 4; i++) {
      circleQuarters[i] = i * circleQuartersDist;
    }
    if (newestGrid[1] == 1) {
      var nothing;
    } else if (newestGrid[2] < (circleQuarters[1]) && newestGrid[2] > 0) {
      newestGridValue = lastGrid[3];
      var tilesInLastGrid = tilesInCircle((newestGrid[1] - 1));
      var indexSimLastCircle = [0, 0, 0];
      indexSimLastCircle[0] = newestGrid[0] - (newestGrid[2] + 1) - (tilesInLastGrid) + (newestGrid[2]);
      indexSimLastCircle[1] = newestGrid[0] - (newestGrid[2] + 1) - (tilesInLastGrid) + (newestGrid[2] - 1);
      console.log("indexSimLastCircle: " + indexSimLastCircle);
      if (grid[indexSimLastCircle[1]][1] != grid[indexSimLastCircle[0]][1]) {
        indexSimLastCircle[1] = newestGrid[0] - 2;
      }
      indexSimLastCircle[2] = newestGrid[0] - (newestGrid[2] + 1) - (tilesInLastGrid) + (newestGrid[2] + 1);
      if (circleQuarters[1] = (newestGrid[2] + 1)) {
        indexSimLastCircle.pop();
        console.log("dit is de voor laatste voor hoek");
      }
      if (newestGrid[2] == circleQuarters[1]) {
        console.log("is hoek");
        indexSimLastCircle[0] = indexSimLastCircle[1];
        indexSimLastCircle.pop();
        indexSimLastCircle.pop();
        console.log(indexSimLastCircle);
      }
      console.log("indexSimLastCircle: " + indexSimLastCircle);
      for (var i = 0; i < indexSimLastCircle.length; i++) {
        newestGridValue += grid[indexSimLastCircle[i]][3];
        console.log("de toevoeging van grid: " + grid[indexSimLastCircle[i]]);
      }
    }
  }
  newestGrid[3] = newestGridValue;
  //console.log("newestGrid: " + newestGrid);
  grid[grid.length] = newestGrid;
  //console.log("grid return whole is: " + grid);
  return grid;
}

function calcAll() {
  var gridIni = gridNul();
  var grid = gridIni[0];
  var gridNamen = gridIni[1];
  var puzzleInput = 20;//312051;
  var gridValue = 0;
  while (gridValue < puzzleInput) {
    grid = calcNext(grid);
    console.log("grid return whole is: ");
    console.log(grid);
    gridValue = grid[grid.length - 1][3];
    console.log("gridValue in loop is: " + gridValue);
  }
}
