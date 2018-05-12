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
  var input = "ffayrhll";
  var grid = [];
  var size = 128;
  for (var i = 0; i < size; i++) {
    grid[i] = [];
    for (var j = 0; j < size; j++) {
      grid[i][j] = 0;
    }
  }
  var hashInputs = [];
  for (var i = 0; i < size; i++) {
    hashInputs[i] = input + "-" + i;
  }
  var Hash = [];
  for (var i = 0; i < grid.length; i++) {
    Hash[i] = calcHash(hashInputs[i]);
  }
  for (var i = 0; i < Hash.length; i++) {
    console.log("hash " + i + " is: ");
    console.log(Hash[i]);
    if (Hash[i].length != 128) {
      console.log("EROOROROROOOROR");
      console.log(Hash[i].length);
    }
  }
  var answer = countSquares(Hash);
  console.log(answer);
}

function countSquares(disk) {
  var count = 0;
  var countCheck = 0;
  for (var i = 0; i < disk.length; i++) {
    for (var j = 0; j < disk[i].length; j++) {
      if (disk[i][j] == 1) {
        count ++;
      } else if (disk[i][j] == 0) {
        countCheck ++;
      } else {
        console.log("hash heeft invalid value: " + disk[i][j]);
      }
    }
  }
  console.log("aantal squares used and unused: ");
  console.log(count);
  console.log(countCheck);
  return count;
}

function calcHash(hashInput) {
  console.log("");
  console.log("calculating hash with input: " + hashInput);
  var input = hashInput.split("");
  console.log("split input into array:");
  console.log(input);
  var lengths = listTransformAscii(input);
  console.log("put array into ascii: " + lengths);
  lengths = addSuffixToLengths(lengths);
  console.log("added suffix to array: " + lengths);
  var list = createList();
  var currentPosition = 0;
  var skipSize = 0;
  var finalArray = doMultipleRounds(64, list, lengths, currentPosition, skipSize);
  var finalHash = createDenseHashes(finalArray[0], 16);
  var finalHex = makeHexNum(finalHash);
  console.log("final hex hash: " + finalHex);
  var bitHash = makeBitHash(finalHex);
  console.log("final bit hash: " + bitHash);
  return bitHash;
}

function makeBitHash(hexHash) {
  var returnString = "";
  for (var i = 0; i < hexHash.length; i++) {
    var charCode = parseInt(hexHash[i], 16);
    var binCode = charCode.toString(2);
    while (binCode.length < 4) {
      binCode = "0" + binCode;
    }
    returnString += binCode;
  }
  return returnString;
}

function createDenseHash(list, step) {
  var beginArray = list.slice((16 * step), (16 * (step + 1)));
  var output = beginArray[0];
  for (var i = 1; i < beginArray.length; i++) {
    output = output ^ beginArray[i];
  }
  return output;
}

function skipToNextPosition(currentPosition, skipSize, length) {
	var returnPosition = 0;
	returnPosition = currentPosition + skipSize + length;
	while (returnPosition > 255) {
		returnPosition -= 256;
	}
	return returnPosition;
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

function reverseArray(array) {
	var arrayReference = array.reverse();
	return arrayReference;
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

function makeHexNum(hash) {
  var hexString = []
  for (var i = 0; i < hash.length; i++) {
    hexString[i] = hash[i].toString(16);
    //console.log(hexString[i]);
    if (hexString[i].length != 2) {
      //console.log("hex not lenght 2 maar abs: " + hexString[i]);
      var correctLengthHex = hexString[i].toString();
      //console.log("tussenstap string = " + correctLengthHex);
      correctLengthHex = "0" + correctLengthHex;
      //console.log("tussenstap string = " + correctLengthHex);
      hexString[i] = correctLengthHex;
      //console.log("hexString verlengt naar: " + hexString[i]);
    }
  }
  var returnString = hexString.join("");
  if (returnString.length != 32) {
    console.log("finalHex hash wrong length");
    console.log(returnString.length);
    console.log(hash);
  }
  return returnString;
}

function createDenseHashes(list, steps) {
  var outputArray = [];
  if (list.length != 256) {
    console.log("list supplied to createDenseHashes is not 256 but: " + list.length);
  }
  for (var i = 0; i < steps; i++) {
    outputArray[i] = createDenseHash(list, i);
  }
  return outputArray;
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

function createList() {
  var list = [];
  list.length = 256;
  for (var i = 0; i < list.length; i++) {
	  list[i] = i;
  }
  return list;
}

function listTransformAscii(inputList) {
  var outputList = [];
  for (var i = 0; i < inputList.length; i++) {
    outputList[i] = inputList[i].charCodeAt(0);
  }
  return outputList;
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
