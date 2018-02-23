const fs = require("fs");

var input = fs.readFile("input5.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    return x;
    }
});

var x;

function doAll(x) {
  var list = x.split("\n");
  list.pop();
  for (var i = 0; i < list.length; i++) {
    var newListEntry = list[i].split(" -> ");
    newListEntry[0] = newListEntry[0].split(" ")[0];
    list[i] = newListEntry;
    if (list[i].length > 1) {
      var newListEntrySecond = list[i][1].split(", ");
      for (var j = 0; j < newListEntrySecond.length; j++) {
        list[i][(j + 1)] = newListEntrySecond[j];
      }
    }
  }
  var listPosRow = [];
  var listPos = [];
  for (var i = 0; i < list.length; i++) {
  	listPosRow[0] = i;
    listPosRow[1] = list[i].length;
    if (listPosRow[1] == 1) {
      listPosRow[2] = 0;
    } else if (listPosRow[1] > 1) {
      for (var j = 0; j < list.length; j++) {
        for (var k = 1; k < list[j].length; k++) {
          if (list[i][0] == list[j][k] && j != i) {
            listPosRow[2] = [1000, j , k];
          }
        }
      }
    }
    listPos[i] = listPosRow.map(e => e);
    console.log(listPos[i]);
  }
}
