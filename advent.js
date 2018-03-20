const fs = require("fs");

var input = fs.readFile("input6.txt", "utf8", (err, data) => {
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
    list[i] = list[i].split(" ");
    list[i].unshift(i, 0);
    list[i][4] = Number(list[i][4]);
    list[i][8] = Number(list[i][8]);
    console.log(list[i]);
  }
  for (var i = 0; i < list.length; i++) {
    if (checkCondition(list[i], list)) {
      var newValue = doProcess(list[i], list);
    }
  }
}

function checkCondition(element, checkList) {
  
}
