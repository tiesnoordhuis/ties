function doAll() {
  var buffer = [0];
  var currentPos = 0;
  for (var step = 0; step < 2018; step++) {
    console.log(step);
    buffer = addStepToBuffer(step, currentPos, buffer);
  }
}

function addStepToBuffer(step, currentPos, buffer) {

}

doAll();
