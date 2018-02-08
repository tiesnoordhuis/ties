function squaresInCircle(n) {
  if (n == 0) {
    return 1;
  } else {
    var circle = (n * 2) + 1;
    var squares = ((circle - 1) * 4);
    //console.log("loop squares: " + squares);
    return squares;
  }
}

function whereNumber(n) {
  var currentN = 0;
  var currentCircle = 0;
  var squares = 0;
  var middenPunten = [0, 0, 0, 0];
  while (currentN < n) {
    squares = squaresInCircle(currentCircle);
    currentN += squares;
    currentCircle ++;
    console.log(squares);
  }
  console.log("n is: " + n);
  currentCircle --;
  console.log("n zit in circle: " + currentCircle);
  var tilesToN = (n - (currentN - squares + 1));
  console.log("tiles in deze circle tot n: " + tilesToN);
  var tilesTillCircle = (currentN - squares);
  console.log("tiles in alle vorige circles: " + tilesTillCircle);
  for (var i = 0; i < middenPunten.length; i++) {
    middenPunten[i] = currentN - ((squares/4) * i) - (squares/8);
    middenPunten[i] = Math.abs(middenPunten[i] - n);
  }
  console.log("middenPunten afstand tot n: " + middenPunten);
  middenPunten.sort(function(a, b){return a - b});
  var print = currentCircle + middenPunten[0];
  console.log("antwoord: " + print);
}

whereNumber(312051);
