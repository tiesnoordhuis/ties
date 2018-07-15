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
  console.log("new grid: ");
  console.log(returnArray);
  return returnArray;
}

var startGrid = [[".", "#", ".", ".", "#", "."], [".", ".", "#", ".", "#", "."], ["#", "#", "#", ".", "#", "."], [".", "#", ".", ".", "#", "."], [".", ".", "#", ".", "#", "."], ["#", "#", "#", ".", "#", "."]];
console.log(startGrid);
startGrid = splitGridCatagory3(startGrid);
console.log(startGrid[0]);
