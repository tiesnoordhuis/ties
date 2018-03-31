const fs = require("fs");

var input = fs.readFile("input7.txt", "utf8", (err, data) => {
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
  var list = x;
  var list2 = [];
  console.log(list);
  for (var i = 0; i < list.length; i++) {
    if (list[i] == "!") {
      i++;
    } else {
      list2.push(list[i]);
    }
  }
  for (var i = 0; i < list2.length; i++) {
    console.log(list2[i]);
  }
}
