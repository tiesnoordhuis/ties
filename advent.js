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
  var highest = 0;
  var listRegister = [];
  for (var i = 0; i < list.length; i++) {
    var registerFound = 0;
    for (var j = 0; j < listRegister.length; j++) {
      if (list[i][2] == listRegister[j][2]) {
        registerFound = 1;
        break;
      }
    }
    if (registerFound == 0) {
      listRegister.push(list[i].slice(0, 3));
      console.log(listRegister[(listRegister.length - 1)]);
    }
  }
  for (var i = 0; i < list.length; i++) {
    if (checkCondition(list[i], listRegister)) {
      listRegister = doProcess(list[i], listRegister);
      highest = checkHighest(listRegister, highest)
    }
  }
  for (var i = 0; i < listRegister.length; i++) {;
    console.log(listRegister[i]);
  }
  console.log(highest);
}

function checkHighest(checkList, highValue) {
  for (var i = 0; i < checkList.length; i++) {
    if (checkList[i][1] > highValue) {
      highValue = checkList[i][1];
      console.log(highValue);
    }
  }
  return highValue;
}

function checkCondition(element, checkList) {
  for (var i = 0; i < checkList.length; i++) {
    if (checkList[i][2] == element[6]) {
      if (checkCompare(checkList[i][1], element[7], element[8]) == 1) {
        console.log(element + "  is waar voor:");
        console.log(checkList[i]);
        return true;
      }
    }
  }
  return false;
}

function checkCompare(value1, comparator, value2) {
  if (comparator == ">") {
    if (value1 > value2) {
      console.log(value1 + comparator + value2);
      return 1;
    }
  }
  if (comparator == ">=") {
    if (value1 >= value2) {
      console.log(value1 + comparator + value2);
      return 1;
    }
  }
  if (comparator == "==") {
    if (value1 == value2) {
      console.log(value1 + comparator + value2);
      return 1;
    }
  }
  if (comparator == "<=") {
    if (value1 <= value2) {
      console.log(value1 + comparator + value2);
      return 1;
    }
  }
  if (comparator == "<") {
    if (value1 < value2) {
      console.log(value1 + comparator + value2);
      return 1;
    }
  }
  if (comparator == "!=") {
    if (value1 != value2) {
      console.log(value1 + comparator + value2);
      return 1;
    }
  }
  return 0;
}

function doProcess(element, checkList) {
  for (var i = 0; i < checkList.length; i++) {
    if (element[2] == checkList[i][2]) {
      if (element[3] == "inc") {
        checkList[i][1] += element[4];
        break;
      } else if (element[3] == "dec") {
        checkList[i][1] -= element[4];
        break;
      }
    }
  }
  return checkList;
}
