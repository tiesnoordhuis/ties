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
  var score = 0;
  var position = 0;
  var packetSteps = 100;
  for (var i = 0; i < input.length; i++) {
    list[i] = input[i].split(": ");
    list[i][0] = Number(list[i][0]);
    list[i][1] = Number(list[i][1]);
    console.log(list[i]);
  }
  var scanner = [];
  var scannerLength = 88;
  for (var i = 0; i <= scannerLength; i++) {
    scanner[i] = [i, [], false];
    if (list[0][0] === i) {
      scanner[i][1] = [0, (list[0][1] - 1), true];
      scanner[i][2] = true;
      list.shift();
    }
  }
  for (var i = 89; i < 100; i++) {
    scanner[i] = [i, [], false];
  }
  var packets = [];
  var packetSucces = true
  var tries = 0;
  displayScanner(scanner);
  while (packetSucces) {
    packets.push([0, true]);
    //displayPackets(packets);
    packetSucces = checkSuccesPackets(packets, tries);
    checkPackets(packets, scanner);
    packets = cullPackets(packets);
    scannerMoves(scanner);
    movePackets(packets);
    tries ++;
    //console.log(tries);
  }
}

function displayPackets(packets) {
  var displayPacketsString = "";
  for (var i = 0; i < packets.length; i++) {
    displayPacketsString += " ,";
    displayPacketsString += (packets[i][0]);
  }
  console.log(displayPacketsString);
}

function checkPackets(packets, scanner) {
  for (var i = 0; i < packets.length; i++) {
    var posPacket = packets[i][0];
    if (scanner[posPacket][2]) {
      if (scanner[posPacket][1][0] === 0) {
        packets[i][1] = false;
      }
    }
  }
}

function checkSuccesPackets(packets, tries) {
  var lastPacket = packets[0];
  //console.log(lastPacket[0]);
  var lastValue = 95;
  if (lastPacket[0] >= lastValue) {
    console.log(tries - lastValue);
    displayPackets(packets);
    return false;
  } else {
    return true;
  }
}

function cullPackets(packets) {
  var returnArray = [];
  for (var i = 0; i < packets.length; i++) {
    if (packets[i][1]) {
      returnArray.push(packets[i]);
    }
  }
  return returnArray;
}

function movePackets(packets) {
  for (var i = 0; i < packets.length; i++) {
    packets[i][0] ++;
  }
}

function scannerMoves(scanner) {
  for (var layer = 0; layer < scanner.length; layer++) {
    scannerMove(scanner, layer);
  }
}

function scannerMove(scanner, layer) {
  if (scanner[layer][2]) {
    if (scanner[layer][1][2]) {
      if (scanner[layer][1][0] < scanner[layer][1][1]) {
        scanner[layer][1][0] ++;
      } else if (scanner[layer][1][0] === scanner[layer][1][1]) {
        scanner[layer][1][2] = false;
        scanner[layer][1][0] --;
      } else {
        console.log("scanner buiten range " + scanner[layer]);
      }
    } else if (scanner[layer][1][2] === false) {
      if (scanner[layer][1][0] > 0) {
        scanner[layer][1][0] --;
      } else if (scanner[layer][1][0] === 0) {
        scanner[layer][1][0] ++;
        scanner[layer][1][2] = true;
      } else {
        console.log("scanner buiten range " + scanner[layer]);
      }
    } else {
      console.log("direction invalid " + scanner[layer]);
    }
  }
}

function displayScanner(scanner) {
  for (var i = 0; i < scanner.length; i++) {
    console.log(scanner[i]);
  }
}
