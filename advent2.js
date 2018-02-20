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
  var gridCorners = [0, 0, 0, 0];
  var tilesInThisCircle = tilesInCircle(newestGrid[1]);
  for (var i = 0; i < gridCorners.length; i++) {
    gridCorners[i] = ((tilesInThisCircle / 4) * (i + 1));
  }
  console.log("gridCorners:  " + gridCorners);
  if (newestGrid[0] == 1) {
    newestGrid[3] = 1;
  } else if (newestGrid[2] < gridCorners[0]) {
    if (newestGrid[1] == 1) {
      if (newestGrid[2] == 0) {
        newestGrid[3] = 1;
      } else if (newestGrid[2] == 1) {
        newestGrid[3] = 2;
      }
      console.log("eerste ring rechts");
    } else if (newestGrid[2] == 0) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[((newestGrid[0]) - tilesInCircle((newestGrid[1] - 1)))][3];
      console.log("begin circle");
    } else if (newestGrid[2] == 1) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - 2)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2])][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 1)][3];
      console.log("eerste rechts");
    } else if (newestGrid[2] < (gridCorners[0] - 2)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2])][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 2)][3];
      console.log("midden rechts");
    } else if (newestGrid[2] == (gridCorners[0] - 2)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 2)][3];
      console.log("een na laatste rechts");
    } else if (newestGrid[2] == (gridCorners[0] - 1)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 2)][3];
      console.log("laastste rechts");
    }
  } else if (newestGrid[2] < gridCorners[1]) {
    if (newestGrid[1] == 1) {
      if (newestGrid[2] == 2) {
        newestGrid[3] = 4;
      } else if (newestGrid[2] == 3) {
        newestGrid[3] = 5;
      }
      console.log("eerste ring boven");
    } else if (newestGrid[2] == (gridCorners[0])) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - 2)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 2)][3];
      console.log("eerste boven");
    } else if (newestGrid[2] < (gridCorners[1] - 2)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 2)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 3)][3];
      console.log("midden boven");
    } else if (newestGrid[2] == (gridCorners[1] - 2)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 3)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 4)][3];
      console.log("een na laatste boven");
    } else if (newestGrid[2] == (gridCorners[1] - 1)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + newestGrid[2] - 4)][3];
      console.log("laastste boven");
    }
  } else if (newestGrid[2] < gridCorners[2]) {
    if (newestGrid[1] == 1) {
      if (newestGrid[2] == 4) {
        newestGrid[3] = 10;
      } else if (newestGrid[2] == 5) {
        newestGrid[3] = 11;
      }
      console.log("eerste ring links");
    } else if (newestGrid[2] == (gridCorners[1])) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - 2)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 3)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 4)][3];
      console.log("eerste links");
    } else if (newestGrid[2] < (gridCorners[2] - 2)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 3)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 4)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 5)][3];
      console.log("midden links");
    } else if (newestGrid[2] == (gridCorners[2] - 2)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 4)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 5)][3];
      console.log("een na laatste links");
    } else if (newestGrid[2] == (gridCorners[2] - 1)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 5)][3];
      console.log("laastste links");
    }
  } else if (newestGrid[2] < gridCorners[3]) {
    if (newestGrid[1] == 1) {
      if (newestGrid[2] == 6) {
        newestGrid[3] = 23;
      } else if (newestGrid[2] == 7) {
        newestGrid[3] = 25;
      }
      console.log("eerste ring onder");
    } else if (newestGrid[2] == (gridCorners[2])) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - 2)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 5)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 6)][3];
      console.log("eerste onder");
    } else if (newestGrid[2] < (gridCorners[3] - 2)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 5)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 6)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 7)][3];
      console.log("midden onder");
    } else if (newestGrid[2] == (gridCorners[3] - 2)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 5)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 6)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 7)][3];
      console.log("een na laatste onder");
    } else if (newestGrid[2] == (gridCorners[3] - 1)) {
      newestGrid[3] = grid[(newestGrid[0] - 1)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 6)][3];
      newestGrid[3] += grid[(newestGrid[0] - newestGrid[2] - tilesInCircle((newestGrid[1] - 1)) + (newestGrid[2] - 1) - 7)][3];
      console.log("laastste onder");
    }
  }
  grid[grid.length] = newestGrid;
  //console.log("grid return whole is: " + grid);
  return grid;
}

function calcAll() {
  var gridIni = gridNul();
  var grid = gridIni[0];
  var gridNamen = gridIni[1];
  var puzzleInput = 312051;
  var gridValue = 0;
  var counter = 0
  while (gridValue < puzzleInput && counter < 400) {
    counter ++;
    grid = calcNext(grid);
    console.log("grid return whole is: ");
    console.log(grid);
    gridValue = grid[grid.length - 1][3];
    console.log("gridValue in loop is: " + gridValue);
  }
}
