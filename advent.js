function doAll(loop) {
  var buffer = [];
  buffer[0] = [];
  buffer[1] = 0;
  for (var step = 0; step < 2018; step++) {
    console.log("step " + step);
    buffer = addStepToBuffer(step, buffer, loop);
    console.log("new position " + buffer[1]);
  }
  var valueAfter2017 = findStep1Value(buffer);
  console.log(valueAfter2017);
  var bufferIndex = 0;
  var last0Index = 0;
  for (var cycle = 0; cycle < 50000000; cycle++) {
    bufferIndex = calcIndex(bufferIndex, cycle, loop);
    if (bufferIndex === 1) {
      console.log(bufferIndex);
      last0Index = cycle;
    }
    bufferIndex ++;
  }
  console.log(last0Index);
}

function calcIndex(buffer, step, loop) {
  if (buffer === 0) {
    return 0;
  }
  var temp = loop % step;
  temp += buffer;
  if (temp > step) {
    temp -= step;
    return temp;
  }
  return temp;
}

function findStep1Value(buffer) {
  var temp = buffer[0].findIndex((element) => {
    return element === 2017;
  });
  return buffer[0][(temp + 1)];
}

function addStepToBuffer(step, buffer, loop) {
  buffer[1] = calcNewPos(buffer[1], step, loop);
  buffer[0].splice((buffer[1] + 1), 0, step);
  buffer[1] ++;
  return buffer;
}

function calcNewPos(currentPos, step, loop) {
  if (step === 0) {
    return 0;
  } else {
    var temp = loop % step;
    temp += currentPos;
    if (temp > step) {
      temp -= step;
    }
    return temp;
  }
}

doAll(355);
