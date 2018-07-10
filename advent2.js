function detectCollisionPoint(index, positions) {
  console.log("positions voor collision detection" + positions);
  var element = positions[index];
  var collisionIndexesPoint = [];
  var firstIndex = positions.indexOf(element);
  while (firstIndex != -1) {
    console.log("firstIndex: " + firstIndex);
    collisionIndexesPoint.push(firstIndex);
    firstIndex = positions.indexOf(element, firstIndex + 1);
  }
  console.log("collisionIndexesPoint return: " + collisionIndexesPoint);
  return collisionIndexesPoint;
}

detectCollisionPoint(0, [0, 1, 2, 0, 0, 4, 0, 2, 3]);
