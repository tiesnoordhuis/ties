doAll();

function doAll() {
  var banks  = ini();
  var didRepeat = 0;
  var indexRedistBank = 0;
  var valueHighestBank = 0;
  var cycleCounter = 0;
  var repeatBanksCheck = [];
  var firstRepeat = [];
  while (didRepeat < 2) {
    indexRedistBank = selectRedistrBank(banks);
    valueHighestBank = banks[indexRedistBank];
    banks[indexRedistBank] = 0;
    var counter = 0;
    if (indexRedistBank == 15) {
      counter = 0
    } else if (indexRedistBank < 15) {
      counter = (indexRedistBank + 1);
    }
    while (valueHighestBank > 0) {
      banks[counter] ++;
      //console.log("de value van bank " + counter + " wordt verhoogt tot " + banks[counter]);
      valueHighestBank --;
      //console.log("de overgebleven value is nu " + valueHighestBank);
      counter ++;
      if (counter == 16) {
        counter = 0;
      }
    }
    if (didRepeat == 0) {
      repeatBanksCheck[cycleCounter] = banks.map(e => e);
      //console.log(repeatBanksCheck[cycleCounter]);
      for (var i = 0; i < (repeatBanksCheck.length - 1); i++) {
        var gelijk = 0;
        var sumRow = 0;
        for (var j = 0; j < 16; j++) {
          sumRow += repeatBanksCheck[cycleCounter][j];
          //console.log("sum row: " + sumRow);
          if (repeatBanksCheck[cycleCounter][j] == repeatBanksCheck[i][j]) {
            gelijk ++;
            //console.log("gelijk " + gelijk);
          }
          if (gelijk == 16) {
            didRepeat = 1;
            console.log("antwoord: " + cycleCounter);
            firstRepeat = repeatBanksCheck[cycleCounter].map(e => e);
            console.log("first repeat: " + firstRepeat);
          }
        }
      }
    } else if (didRepeat == 1) {
      var gelijk = 0;
      for (var j = 0; j < 16; j++) {
        if (banks[j] == firstRepeat[j]) {
          gelijk ++;
        }
        if (gelijk == 16) {
          didRepeat = 2;
          console.log("antwoord 2: " + cycleCounter);
        }
      }
    }
    cycleCounter ++;
  }
}

function ini() {
  var banks = [4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5];
  return banks;
}

function selectRedistrBank(banks) {
  var banks = banks;
  //console.log("de banks op moment van highest bepalen zijn:");
  //console.log(banks);
  var highestBank = banks.map(e => e);
  highestBank = highestBank.sort(function(a, b){return b - a});
  for (var i = 0; i < highestBank.length; i++) {
    if (banks[i] == highestBank[0]) {
      //console.log("de hoogste value zit op index " + i);
      return i;
    }
  }
}

function buitenTest() {
  console.log("banks tussenstap: " + banks);
  var loops2 = 0;
  while (didRepeat == 1) {
    //console.log("banks tweede cycle: " + banks);
    //console.log("check bank tweede cycle: " + firstRepeat);
    indexRedistBank = selectRedistrBank(banks);
    valueHighestBank = banks[indexRedistBank];
    banks[indexRedistBank] = 0;
    var counter = 0;
    if (indexRedistBank == 15) {
      counter = 0
    } else if (indexRedistBank < 15) {
      counter = (indexRedistBank + 1);
    }
    while (valueHighestBank > 0) {
      banks[counter] ++;
      //console.log("de value van bank " + counter + " wordt verhoogt tot " + banks[counter]);
      valueHighestBank --;
      //console.log("de overgebleven value is nu " + valueHighestBank);
      counter ++;
      if (counter == 16) {
        counter = 0;
      }
    }
    if (banks == firstRepeat) {
      console.log("antwoord 2: " + loops2);
      didRepeat = 2;
    }
    loops2 ++;
  }
}
