/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
var direction = 0;
var speed = 0;
var decay = 0;
var counter = 1;

// game loop
while (true) {
    var inputs = readline().split(' ');
    var x = parseInt(inputs[0]);
    var y = parseInt(inputs[1]);
    var nextCheckpointX = parseInt(inputs[2]); // x position of the next check point
    var nextCheckpointY = parseInt(inputs[3]); // y position of the next check point
    var nextCheckpointDist = parseInt(inputs[4]); // distance to the next checkpoint
    var nextCheckpointAngle = parseInt(inputs[5]); // angle between your pod orientation and the direction of the next checkpoint
    var inputs = readline().split(' ');
    var opponentX = parseInt(inputs[0]);
    var opponentY = parseInt(inputs[1]);
    var thrust = 0;
    var angle = nextCheckpointAngle;
    var dist = nextCheckpointDist;
    var distSlow = 3000;
    var distSmall = 2400
    var radiusP = 600;
    var gotoX = 0;
    var gotoY = 0;
    var closestPoint = [0,0];
    counter = counter;
    // Write an action using print()
    // To debug: printErr('Debug messages...');
    printErr("nextCheckpointAngle: " + nextCheckpointAngle);
    printErr("nextCheckpointDist: " + nextCheckpointDist);
    if (counter == 1) {
        printErr("boost used: NO")
    } else if (counter == 0) {
        printErr("boost used: YES")
    }

    var distPX = 0;
    distPX = nextCheckpointX - 8000;
    var distPY = 0;
    distPY = nextCheckpointY - 4500;
    var distP = 0;
    distP = Math.sqrt(Math.pow(distPX, 2) + Math.pow(distPY, 2));
    var scaleFactor = 0;
    if (distP < distSmall) {
        radiusP = 300 + (300 * (distP/distSmall));
    }
    scaleFactor = (radiusP/distP);
    closestPoint[0] = (nextCheckpointX - (scaleFactor*distPX));
    closestPoint[1] = (nextCheckpointY - (scaleFactor*distPY));

    thrust = 100;

    if (angle < 0) {
        angle = angle * (0-1);
    }

    if (angle >= 90) {
        thrust = 0;
    }

    var angleSlowdown = 0;

    if (angle >= 70 && angle < 90) {
        angleSlowdown = ((90 - angle)/20);
        thrust = thrust * angleSlowdown;
        printErr("slowed down by factor: " + angleSlowdown + "  to a thrust of: " + thrust);
    }

    var distSlowAngle = 0;

    if (dist < distSlow && angle < 90) {
        distSlowAngle = (40 - (40 * Math.pow((angle/90),2)));
        printErr("de angle vertraging: " + distSlowAngle);
        thrust = (((dist/distSlow) * distSlowAngle) + (100 - distSlowAngle));
        printErr("thrust slowed by distance to: " + thrust);
    }

    thrust = parseInt(thrust);
    gotoX = parseInt(closestPoint[0]);
    gotoY = parseInt(closestPoint[1]);

    if (angle < 3 && dist > 7000) {
        printErr("boost tried");
        if (counter == 1) {
            thrust = "BOOST";
            counter = 0;
            printErr("boost activated");
        }
    }


    // You have to output the target position
    // followed by the power (0 <= thrust <= 100)
    // i.e.: "x y thrust"
    print(gotoX + ' ' + gotoY + " " + thrust);
}
