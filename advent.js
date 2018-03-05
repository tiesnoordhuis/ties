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
  var list2 = [];
  var list = x.split("\n");
  list.pop();
  for (var i = 0; i < list.length; i++) {
    var newListEntry = list[i].split(" -> ");
    //newListEntry[0] = newListEntry[0].split(" ")[0];
    list[i] = newListEntry;
    if (list[i].length > 1) {
      var newListEntrySecond = list[i][1].split(", ");
      list[i][1] = newListEntrySecond;
    } else {
      list[i][1] = [""];
    }
    var newListEntryWeight = list[i][0].split(" (");
    list[i][0] = newListEntryWeight[0];
    list[i][2] = Number(newListEntryWeight[1].split(")")[0]);
    list[i][3] = 0;
    list2[i] = [i, list[i][1].slice()];
    console.log(list[i]);
  }
  var listWeights = [];
  for (var i = 0; i < list.length; i++) {
    listWeights[i] = [];
    for (var j = 0; j < list[i][1].length; j++) {
      for (var k = 0; k < list.length; k++) {
        if (list[i][1][j] == list[k][0] && k != i) {
          listWeights[i][j] = list[k][2];
        }
      }
    }
  }
  //console.log(listWeights);
  var falseWeights = [];
  for (var i = 0; i < listWeights.length; i++) {
    var checked = 0;
    var referenceValue = listWeights[i][0];
    for (var j = 1; j < listWeights[i].length; j++) {
      if (listWeights[i][j] == referenceValue) {

      } else if (listWeights[i][j] > referenceValue) {
        checked = 1;
      } else if (listWeights[i][j] < referenceValue) {
        checked = 1;
      }
    }
    if (checked != 0) {
      //console.log(listWeights[i]);
      falseWeights.push([i, listWeights[i]])
    }
  }
  //console.log(falseWeights);
  var whileCheck = 0
  console.log(checkDone(list));
  while (whileCheck == 0) {
    if (checkDone(list)) {
      whileCheck = 1;
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i][1] == "") {
        list[i][3] = 1;
        //console.log(list[i]);
      } else {
        //console.log(list[i]);
        for (var k = 0; k < list.length; k++) {
          for (var j = 0; j < list[i][1].length; j++) {
            if (list[k][0] == list[i][1][j] && list[k][3] == 1) {
              //console.log(list[i]);
              list[i][1].splice(j, 1);
              list[i][2] += list[k][2];
              //console.log(list[i]);
            }
          }
        }
      }
      //console.log(list[i]);
    }
  }
  for (var i = 0; i < list.length; i++) {
    console.log(list[i]);
    console.log(list2[i][1]);
  }
}

function checkDone(list) {
  var checkCounter = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i][3] == 0) {
      checkCounter ++;
      if (checkCounter > 2) {
        return false;
      }
    }
  }
  return true;
}
