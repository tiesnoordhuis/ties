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
    list[i][4] = Number(list[i][2]);
    list[i][5] = [];
  }
  for (var i = 0; i < list.length; i++) {
    if (list[i][1] != "") {
      list[i][3] = 1;
    }
  }
  for (var i = 0; i < list.length; i++) {
    //console.log(list[i]);
  }
  var refCounter = 0;
  var answerArray = [];
  while (refCounter < 20) {
    for (var i = 0; i < list.length; i++) {
      if (list[i][3] == refCounter) {
        for (var k = 0; k < list[i][1].length; k++) {
          answerArray[0] = lookupWeight(list[i][1][k], refCounter, list);
          var alreadySet = 0;
          for (var j = 0; j < list[i][5].length; j++) {
            if (list[i][5][j][1] == list[i][1][k]) {
              alreadySet = 1;
              //console.log("already set");
            }
          }
          if (answerArray[0][1] == 1 && alreadySet == 0) {
            list[i][5][(list[i][5].length)] = [answerArray[0][0], answerArray[0][2]];
          }
        }
        //console.log(list[i][5].length);
        //console.log(list[i][1].length);
        if (list[i][5].length == list[i][1].length || list[i][3] == 0) {
          //console.log("hetzelfde");
          //list[i][3] = refCounter; //niet nodig
          //console.log(list[i][3]);
        } else if (list[i][5].length != list[i][1].length) {
          list[i][3] = (refCounter + 1);
          //console.log("niet hetzelfde");
        }
        //console.log(list[i]);
      }
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i][3] == refCounter) {
        var totalWeight = 0;
        var weightCompare = []
        for (var k = 0; k < list[i][5].length; k++) {
          totalWeight += list[i][5][k][0];
          weightCompare[k] = list[i][5][k][0];
        }
        for (var j = 1; j < weightCompare.length; j++) {
          if (weightCompare[0] != weightCompare[j]) {
            console.log("weight fout in");
            console.log(list[i]);
          }
        }
        //console.log(totalWeight);
        list[i][4] = list[i][2] + totalWeight;
        //console.log(list[i]);
      }
    }
    //console.log(refCounter);
    refCounter ++;
  }
}

function lookupWeight(name, cycle, checkList) {
  var weight = 0;
  for (var i = 0; i < checkList.length; i++) {
    if (checkList[i][0] == name) {
      if (checkList[i][3] < cycle) {
        weight = checkList[i][4];
        return [weight, 1, name];
      }
    }
  }
  return [weight, 0, name];
}
