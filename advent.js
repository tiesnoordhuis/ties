const fs = require("fs");

var input = fs.readFile("input13.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    }
});

function doAll(input) {
  input = input.split()
}
