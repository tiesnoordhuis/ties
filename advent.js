const fs = require("fs");

var input = fs.readFile("input11.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    }
});

function doAll(x) {
  var input = x.split("\n");
  input.pop();
  var list = [];
  for (var i = 0; i < input.length; i++) {
    list[i] = input[i].split(": ");
    list[i][0] = Number(list[i][0]);
    list[i][1] = Number(list[i][1]);
  }
  for (var i = 0; i < list.length; i++) {
    console.log(list[i]);
  }
}
