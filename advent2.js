const fs = require("fs");

var input = fs.readFile("input8.txt", "utf8", (err, data) => {
  if (err) {
    return console.error(err);
  }
  else {
    x = data;
    doAll(x);
    }
});

function doAll(x) {
  var input = x.split("");
  input.pop()
  var lengths = listTransformAscii(input);
  lengths = addSuffixToLengths(lengths);
  var list = createList();
  var checkSum = 0;
  for (var i = 0; i < list.length; i++) {
    checkSum += list[i];
  }
  console.log(checkSum);
  var currentPosition = 0;
  var skipSize = 0;
  var finalArray = doMultipleRounds(64, list, lengths, currentPosition, skipSize);
  var finalHash = createDenseHashes(finalArray[0], 16);
  console.log(finalHash);
  var finalHex = makeHexNum(finalHash);
  console.log(finalHex);
  var testArray = [65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22];
  //console.log(createDenseHash(testArray, 0));
}

function makeHexNum(hash) {
  var hexString = []
  for (var i = 0; i < hash.length; i++) {
    hexString[i] = hash[i].toString(16);
  }
  var returnString = hexString.join("");
  return returnString;
}

function createDenseHashes(list, steps) {
  var outputArray = [];
  for (var i = 0; i < steps; i++) {
    outputArray[i] = createDenseHash(list, i);
  }
  return outputArray;
}

function createDenseHash(list, step) {
  var beginArray = list.slice((16 * step), ((16 * (step + 1)) - 0));
  console.log(beginArray);
  var output = beginArray[0];
  for (var i = 1; i < beginArray.length; i++) {
    output = output ^ beginArray[i];
  }
  return output;
}

function doMultipleRounds(nRounds, list, lengths, currentPosition, skipSize) {
  var returnArray = [];
  for (var i = 0; i < nRounds; i++) {
    returnArray = doKnots(list, lengths, currentPosition, skipSize);
    list = returnArray[0];
    lengths = returnArray[1];
    currentPosition = returnArray[2];
    skipSize = returnArray[3];
  }
  return returnArray;
}

function doKnots(list, lengths, currentPosition, skipSize) {
  var returnArray = [];
  for (var i = 0; i < lengths.length; i++) {
    returnArray = doKnot(list, lengths, currentPosition, skipSize, i);
    list = returnArray[0];
    lengths = returnArray[1];
    currentPosition = returnArray[2];
    skipSize = returnArray[3];
  }
  return returnArray;
}

function doKnot(list, lengths, currentPosition, skipSize, i) {
  var returnArray = [];
  var selectedArray = selectArray(list, currentPosition, lengths[i]);
  var reversedArray = reverseArray(selectedArray);
  list = insertArrayBackIn(list, reversedArray, currentPosition);
  currentPosition = skipToNextPosition(currentPosition, skipSize, lengths[i]);
  skipSize ++;
  returnArray[0] = list;
  returnArray[1] = lengths;
  returnArray[2] = currentPosition;
  returnArray[3] = skipSize;
  return returnArray;
}

function addSuffixToLengths(inputList) {
  var outputList = [];
  var standardSuffix = [17, 31, 73, 47, 23];
  for (var i = 0; i < inputList.length; i++) {
    outputList[i] = inputList[i];
  }
  outputList = outputList.concat(standardSuffix);
  return outputList;
}

function listTransformAscii(inputList) {
  var outputList = [];
  for (var i = 0; i < inputList.length; i++) {
    outputList[i] = inputList[i].charCodeAt(0);
  }
  return outputList;
}

function createList() {
  var list = [];
  list.length = 256;
  for (var i = 0; i < list.length; i++) {
	  list[i] = i;
  }
  return list;
}

function viewList(list) {
	console.log("");
	for (var i = 0; i < list.length; i++) {
	  console.log(i + "  " + list[i]);
  }
}

function insertArrayBackIn(list, reversedArray, currentPosition) {
	var listP1 = [];
  var listP2 = [];
  var listP3 = [];
  var returnArray = [];
  var debug = "";
	if ((currentPosition + reversedArray.length) > 256) {
    var reversedArrayP1 = reversedArray.slice(0, (256 - currentPosition))
		var reversedArrayP2 = reversedArray.slice((256 - currentPosition));
		listP1 = reversedArrayP2;
		listP2 = list.slice(reversedArrayP2.length, currentPosition);
		listP3 = reversedArrayP1;
		returnArray = listP1.concat(listP2);
    returnArray = returnArray.concat(listP3);
    debug = "reversedArray wraped around";
  } else if ((currentPosition + reversedArray.length) <= 256) {
    listP1 = list.slice(0, currentPosition);
    listP2 = reversedArray;
    listP3 = list.slice((listP1.length + listP2.length))
    returnArray = listP1.concat(listP2);
    returnArray = returnArray.concat(listP3);
    debug = "reversedArray was short";
	} else {
    console.log("fout in insertArrayBackIn");
  }
  if (returnArray.length != 256) {
    console.log(debug);
    console.log(currentPosition);
    console.log(reversedArray.length);
    for (var i = 0; i < list.length; i++) {
      console.log(list[i] + "  " + returnArray[i]);

    }
  }
	return returnArray;
}

function skipToNextPosition(currentPosition, skipSize, length) {
	var returnPosition = 0;
	returnPosition = currentPosition + skipSize + length;
	while (returnPosition > 255) {
		returnPosition -= 256;
	}
	return returnPosition;
}

function selectArray(list, currentPosition, stepLength) {
	var returnArray = [];
	var returnArrayP1 = [];
	var returnArrayP2 = [];
	var overflow = 0;
	if ((currentPosition + stepLength) > 255) {
		returnArrayP1 = list.slice(currentPosition);
		overflow = ((currentPosition + stepLength) - 256);
		returnArrayP2 = list.slice(0, overflow);
		returnArray = returnArrayP1.concat(returnArrayP2);
	} else if ((currentPosition + stepLength) <= 255) {
		returnArray = list.slice(currentPosition, (stepLength + currentPosition));
	} else {
    console.log("fout in select array");
  }
	return returnArray;
}

function reverseArray(array) {
	var arrayReference = array.reverse();
	return arrayReference;
}
