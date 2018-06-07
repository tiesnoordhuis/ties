const factorA = 16807;
const factorB = 48271;
const divider = 2147483647;
const startValueA = 679;
const startValueB = 771;
const totalRounds = 40000000;

doAll(factorA, factorB, divider, startValueA, startValueB, totalRounds);

function doAll(factorA, factorB, divider, startValueA, startValueB, totalRounds) {
  var currentValueA = startValueA;
  var currentValueB = startValueB;
  var matches = 0;
  for (var round = 0; round < totalRounds; round++) {
    currentValueA = calcNextValue(factorA, divider, currentValueA);
    currentValueB = calcNextValue(factorB, divider, currentValueB);
    if (checkMatch(currentValueA, currentValueB)) {
      matches ++;
      console.log("match found in round: " + round);
    }
  }
  console.log("total amount of matches found: " + matches);
}

function calcNextValue(factor, divider, startValue) {
  var returnValue = startValue * factor;
  returnValue = returnValue % divider;
  return returnValue;
}

function checkMatch(valueA, valueB) {
  var valueABit = valueA.toString(2);
  var valueBBit = valueB.toString(2);
  while (valueABit.length < 16) {
    //console.log("valueABit too short, will be lengthend, currently: " + valueABit);
    valueABit = "0" + valueABit;
  }
  while (valueBBit.length < 16) {
    //console.log("valueBBit too short, will be lengthend, currently: " + valueBBit);
    valueBBit = "0" + valueBBit;
  }
  valueABit = valueABit.slice(-16);
  valueBBit = valueBBit.slice(-16);
  if (valueABit === valueBBit) {
    return true;
  }
  return false;
}
