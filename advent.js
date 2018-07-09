const fs = require("fs");

var input = fs.readFile("input15.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    }
});

function doAll(x) {
  var input = x.split("\r\n");
  input.pop();
  var particles = buildParticlesObject(input);
  var running = true;
  var cycles = 0;
  var closestParticle;
  while (running) {
    particles = detectCollision(particles);
    particles = renderFrame(particles);
    closestParticle = findClosest(particles);
    console.log(closestParticle);
    if (cycles > 10000000) {
      running = false;
    }
    cycles ++;
  }
}

<<<<<<< HEAD
function detectCollision(particles) {
  var positions = [];
  for (var i = 0; i < particles.length; i++) {
    positions[i] = particles[i].position.join();
  }
  for (var i = 0; i < positions.length; i++) {
    if (true) {

    }
  }
=======
function walkPath(instructions) {
  var beginPosition = findBeginPosition(instructions);
  var walker = { position: beginPosition, direction: "S", lettersSeen: ""};
  console.log(walker);
  console.log(instructions[walker.position[0]][walker.position[1]]);
  var lookingForLetters = true;
  var counter = 1;
  while (lookingForLetters) {
    counter ++;
    walker = doStep(walker, instructions);
    if (walker.lettersSeen.length > 9) {
      lookingForLetters = false;
    }
  }
  console.log(walker.lettersSeen);
  console.log("counter: " + counter);
}

function doStep(walker, instructions) {
  walker.position = calcNewPosition(walker);
  console.log(walker);
  console.log(instructions[walker.position[0]][walker.position[1]]);
  switch (instructions[walker.position[0]][walker.position[1]]) {
    case "vert":
      walker.direction = goVert(walker);
      break;
    case "hori":
      walker.direction = goHori(walker);
      break;
    case "cros":
      walker.direction = goCros(walker, instructions);
      break;
    default:
      walker = goOverLetter(walker, instructions);
      break;
  }
  return walker;
}

function goOverLetter(walker, instructions) {
  walker.lettersSeen += instructions[walker.position[0]][walker.position[1]][1];
  return walker;
}

function goCros(walker, instructions) {
  var oldPosition = [walker.position[0], walker.position[1]];
  switch (walker.direction) {
    case "S":
      if (instructions[oldPosition[0]][(oldPosition[1] - 1)] != "vert" && instructions[oldPosition[0]][(oldPosition[1] - 1)] != 0) {
        return "W";
      } else {
        return "E";
      }
      break;
    case "N":
      if (instructions[oldPosition[0]][(oldPosition[1] - 1)] != "vert" && instructions[oldPosition[0]][(oldPosition[1] - 1)] != 0) {
        return "W";
      } else {
        return "E";
      }
      break;
    case "E":
      if (instructions[(oldPosition[0] - 1)][oldPosition[1]] != "hori" && instructions[(oldPosition[0] - 1)][oldPosition[1]] != 0) {
        return "N";
      } else {
        return "S";
      }
      break;
    case "W":
    if (instructions[(oldPosition[0] - 1)][oldPosition[1]] != "hori" && instructions[(oldPosition[0] - 1)][oldPosition[1]] != 0) {
      return "N";
    } else {
      return "S";
    }
      break;
    default:
      console.error("unkown direction: " + walker.direction);
  }
}

function goVert(walker) {
  return walker.direction;
}

function goHori(walker) {
  return walker.direction;
}

function calcNewPosition(walker) {
  var oldPosition = [walker.position[0], walker.position[1]];
  var returnArray = [];
  switch (walker.direction) {
    case "S":
      returnArray = [(oldPosition[0] + 1), oldPosition[1]];
      break;
    case "N":
      returnArray = [(oldPosition[0] - 1), oldPosition[1]];
      break;
    case "E":
      returnArray = [oldPosition[0], (oldPosition[1] + 1)];
      break;
    case "W":
      returnArray = [oldPosition[0], (oldPosition[1] - 1)];
      break;
    default:
      console.error("unkown direction: " + walker.direction);
  }
  return [returnArray[0], returnArray[1]];
}

function findBeginPosition(instructions) {
  var topLine = instructions[0].slice();
  var returnArray = [];
  topLine.forEach((element, index) => {
    if (element === "vert") {
      returnArray = [0, index];
      console.log("begin found at position: " + index);
    }
  })
  return returnArray;
>>>>>>> 0cfc475619a2551cb537ad41b1c4e8836a85513e
}

function findClosest(particles) {
  var closest = [0, 1000000000];
  for (var i = 0; i < particles.length; i++) {
    var distance = (Math.abs(particles[i].position[0]) + Math.abs(particles[i].position[1]) + Math.abs(particles[i].position[2]));
    if (distance <= closest[1]) {
      closest = [i, distance];
    }
  }
  //console.log("closest: " + closest);
  return closest[0]
}

function renderFrame(particles) {
  particles = updateVelocity(particles);
  particles = updatePosition(particles);
  return particles;
}

function updateVelocity(particles) {
  for (var i = 0; i < particles.length; i++) {
    particles[i].velocity[0] += particles[i].acceleration[0];
    particles[i].velocity[1] += particles[i].acceleration[1];
    particles[i].velocity[2] += particles[i].acceleration[2];
  }
  return particles;
}

function updatePosition(particles) {
  for (var i = 0; i < particles.length; i++) {
    particles[i].position[0] += particles[i].velocity[0];
    particles[i].position[1] += particles[i].velocity[1];
    particles[i].position[2] += particles[i].velocity[2];
  }
  return particles;
}

function buildParticlesObject(input) {
  var returnArray = [];
  for (var i = 0; i < input.length; i++) {
    var temp = input[i].split(", ");
    var position = temp[0].slice(3, -1);
    position = position.split(",");
    for (var j = 0; j < position.length; j++) {
      position[j] = Number(position[j])
    }
    var velocity = temp[1].slice(3, -1);
    velocity = velocity.split(",");
    for (var j = 0; j < velocity.length; j++) {
      velocity[j] = Number(velocity[j])
    }
    var acceleration = temp[2].slice(3, -1);
    acceleration = acceleration.split(",");
    for (var j = 0; j < acceleration.length; j++) {
      acceleration[j] = Number(acceleration[j])
    }
    var particle = {particleNumber: i, position: position, velocity: velocity, acceleration, acceleration};
    returnArray[i] = particle
  }
  return returnArray;
}
