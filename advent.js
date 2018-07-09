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
  var input = x.split("\n");
  input.pop();
  var particles = buildParticlesObject(input);
  var running = true;
  var cycles = 0;
  var closestParticle;
  while (running) {
    particles = detectCollision(particles);
    particles = renderFrame(particles);
    closestParticle = findClosest(particles);
    console.log("aantal particles: " + particles.length);
    if (cycles > 1) {
      running = false;
    }
    cycles ++;
  }
}

function detectCollision(particles) {
  var positions = [];
  for (var i = 0; i < particles.length; i++) {
    positions[i] = particles[i].position[0] + particles[i].position[1] + particles[i].position[2];
    console.log("position op index " + i + " is: " + positions[i]);
  }
  var collisionIndexes = [];
  for (var i = 0; i < positions.length; i++) {
    var testCase = positions[i];
    var testArray = [];
    testArray = positions.slice(i - 1);
    testArray.concat(positions.slice(i + 1, positions.length - 1));
    if (testArray.includes(testCase)) {
      collisionIndexes.push(i);
    }
  }
  var returnArray = deleteCollisions(collisionIndexes, particles);
  return returnArray;
}

function deleteCollisions(collisionIndexes, particles) {
  console.log(collisionIndexes);
  if (collisionIndexes.length === 0) {
    return particles;
  }
  for (var i = collisionIndexes.length - 1; i >= 0; i--) {
    particles.splice(collisionIndexes[i], 1);
  }
  return particles;
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
