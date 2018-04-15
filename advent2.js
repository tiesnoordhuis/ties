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
  var currentPosition = 0;
  var skipSize = 0;
  doMultipleRounds(4, list, lengths, currentPosition, skipSize);
}

function doMultipleRounds(nRounds, list, lengths, currentPosition, skipSize) {
  for (var i = 0; i < nRounds; i++) {
    currentPosition = doKnot(list, lengths, currentPosition, skipSize);
  }
}

function doKnot(list, lengths, currentPosition, skipSize) {
  for (var i = 0; i < lengths.length; i++) {
    list[i] = list[i] + currentPosition;
    currentPosition ++;
  }
  viewList(list)
  return currentPosition;
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

function insertArrayBackIn(list, flipedArray, currentPosition) {
	var listT = list.slice();
	if ((currentPosition + flipedArray.length) > 255) {
		var flipedArrayP1 = [];
		var flipedArrayP2 = [];
		flipedArrayP1 = flipedArray.slice(0, (255 - currentPosition));
		flipedArrayP2 = flipedArray.slice((255 - currentPosition));
		listT.splice(currentPosition);
		listT = listT.concat(flipedArrayP1);
		listT.splice(0, flipedArrayP2.length);
		listT = flipedArrayP2.concat(listT);
		} else {
			var endOfList = listT.slice((currentPosition + flipedArray.length));
			listT.splice(currentPosition);
			listT = listT.concat(flipedArray);
			listT = listT.concat(endOfList);
	}
	return listT;
}

function skipToNextPosition(currentPosition, skipSize, length) {
	var returnPosition = 0;
	returnPosition = currentPosition + skipSize + length;
	if (returnPosition > 255) {
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
	} else {
		returnArray = list.slice(currentPosition, (stepLength + currentPosition));
	}
	return returnArray;
}

function reverseArray(array) {
	var arrayReference = array.slice();
	for (var i = 0; i < array.length; i++) {
		array[i] = arrayReference[((array.length - 1) - i)];
	}
	return array;
}
