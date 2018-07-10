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
    console.log("aantal particles: " + particles.length + " in cycle " + cycles);
    if (cycles > 300000) {
      running = false;
    }
    cycles ++;
  }
}

function detectCollision(particles) {
  var positions = [];
  for (var i = 0; i < particles.length; i++) {
    positions[i] = [particles[i].position[0], particles[i].position[1], particles[i].position[2], "string"].join("");
    //console.log("position op index " + i + " is: " + positions[i]);
  }
  var collisionIndexes = [];
  for (var i = 0; i < positions.length; i++) {
    var collisionIndexesPoint = detectCollisionPoint(i, positions);
    if (collisionIndexesPoint.length > 1) {
      for (var j = 0; j < collisionIndexesPoint.length; j++) {
        collisionIndexes.push(collisionIndexesPoint[j])
      }
      //console.log("collisionIndexes concated: " + collisionIndexes);
    }
  }
  var returnArray = deleteCollisions(collisionIndexes, particles);
  return returnArray;
}

function detectCollisionPoint(index, positions) {
  //console.log("position voor collision detection" + positions[index]);
  var element = positions[index];
  var collisionIndexesPoint = [];
  var firstIndex = positions.indexOf(element);
  while (firstIndex != -1) {
    //console.log("firstIndex: " + firstIndex + " of position: " + element);
    collisionIndexesPoint.push(firstIndex);
    firstIndex = positions.indexOf(element, firstIndex + 1);
  }
  //console.log("collisionIndexesPoint return: " + collisionIndexesPoint);
  return collisionIndexesPoint;
}

function deleteCollisions(collisionIndexes, particles) {
  console.log("delete collisionIndexes: " + collisionIndexes);
  var collisionIndexesNorm = singlesListCollisionIndexes(collisionIndexes);
  console.log("delete collisionIndexes Norm: " + collisionIndexesNorm);
  if (collisionIndexesNorm.length === 0) {
    return particles;
  }
  for (var i = collisionIndexesNorm.length - 1; i >= 0; i--) {
    var deletedParticeles = particles.splice(collisionIndexesNorm[i], 1);
  }
  //console.log("deletedParticeles: " + deletedParticeles);
  return particles;
}

function singlesListCollisionIndexes(collisionIndexes) {
  var returnArray = [];
  var duplicates = [];
  returnArray = collisionIndexes.sort((a, b) => {
    return a - b;
  })
  for (var i = 1; i < returnArray.length; i++) {
    if (returnArray[i] === returnArray[i - 1]) {
      duplicates.push(i);
    }
  }
  for (var i = duplicates.length - 1; i >= 0; i--) {
    var deletedParticeles = returnArray.splice(duplicates[i], 1);
  }
  return returnArray;
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
