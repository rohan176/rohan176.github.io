/*
Rohan Mehta
Yahtzee Project
You need to do enter to enter all categories
*/


var roll_button = document.getElementById("roll_button")

var diceArray = [];

var turnCount = 0;
var rollCount = 0;

var total_score = 0;
var total_upper = 0;
var total_lower = 0;
var grand_total = 0;

var diceRolled = false;

var dice_array = [
  '<img src="images/1.svg" height="40" width="40">',
  '<img src="images/2.svg" height="40" width="40">',
  '<img src="images/3.svg" height="40" width="40">',
  '<img src="images/4.svg" height="40" width="40">',
  '<img src="images/5.svg" height="40" width="40">',
  '<img src="images/6.svg" height="40" width="40">',
]

var name = "";

var gameData = {
  turnCount: 0,
  rollCount: 0,
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  three_kind: [],
  four_kind: [],
  full_house: [],
  sm_straight: [],
  lg_straight: [],
  yahtzee: [],
  chance: [],
  dice: [0,0,0,0,0],
  diceReserved: [0,0,0,0,0],
  username: name
}

rollDice();
diceReserve();
upperCategoryValid();
lowerCategoryValid();
nameValid();
localStorageFun();
localStorageLoading()
newGame();

function newGame(){
  document.getElementById("gameNew").addEventListener('click', function(){
   gameData = {
      turnCount: 0,
      rollCount: 0,
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      three_kind: [],
      four_kind: [],
      full_house: [],
      sm_straight: [],
      lg_straight: [],
      yahtzee: [],
      chance: [],
      dice: [0,0,0,0,0],
      diceReserved: [0,0,0,0,0],
      username: name
    }
    var turnCount = 0;
    var rollCount = 0;
    var total_score = 0;
    var total_upper = 0;
    var total_lower = 0;
    var grand_total = 0;
    for(var i = 0; i<5; i++){
      document.getElementById("dice_"+i).setAttribute("class", "notClicked");
    }
    window.location.reload();
  });
}

function localStorageFun(){
  document.getElementById("gaveSave").addEventListener('click', function(){
    if(name == "")
    document.getElementById("name").innerHTML = "PLEASE ENTER A NAME!!!!!!!!!!"
    else{
      gameData.username = name;
      gameData.turnCount = turnCount;
      gameData.rollCount = rollCount;

      if((document.getElementById('dice_1').innerHTML.includes('question')))
      diceArray = [0,0,0,0,0];

      gameData.dice = diceArray;

      for(var i = 1; i < 7; i++){
        if(document.getElementById(i+"_score").value)
        gameData[i] = document.getElementById(i+"_score").value
      }

      if(diceArray[0] == 0)
      gameData.diceReserved = [0,0,0,0,0]
      else{
        for(var i = 0; i <5; i++){
          if(document.getElementById("dice_"+i).getAttribute("class") == "clicked"){
            gameData.diceReserved[i] = 1;
          }
          else{
            gameData.diceReserved[i] = 0;
          }
        }
      }

      if(document.getElementById("three_kind").value){
        gameData.three_kind = parseInt(document.getElementById("three_kind").value)
        console.log("SAIMON")
      }
      if(document.getElementById("four_kind").value)
      gameData.four_kind = parseInt(document.getElementById("four_kind").value)
      if(document.getElementById("full_house").value)
      gameData.full_house = parseInt(document.getElementById("full_house").value)
      if(document.getElementById("sm_straight").value)
      gameData.sm_straight = parseInt(document.getElementById("sm_straight").value)
      if(document.getElementById("lg_straight").value)
      gameData.lg_straight = parseInt(document.getElementById("lg_straight").value)
      if(document.getElementById("yahtzee").value)
      gameData.yahtzee = parseInt(document.getElementById("yahtzee").value)
      if(document.getElementById("chance").value)
      gameData.chance = parseInt(document.getElementById("chance").value)
    }
    localStorage.setItem(gameData.username, JSON.stringify(gameData))
    console.log(gameData)
  });
}

function localStorageLoading(){
  document.getElementById("gameLoad").addEventListener('click', function(){
    if(name == "")
    document.getElementById("name").innerHTML = "PLEASE ENTER A NAME!!!!!!!!!!"
    else if (!localStorage.getItem(name))
    document.getElementById("name").innerHTML = "NO GAME SAVED UNDER THIS NAME"
    else{
      newGame();
      gameData = JSON.parse(localStorage.getItem(name));
      turnCount = gameData.turnCount
      rollCount = gameData.rollCount;
      console.log("NEW GAME DATA: " )
      console.log(gameData)
      if(gameData.dice[0] !== 0){
        for(var i = 0; i < 5; i++){
          document.getElementById('dice_'+i).innerHTML = dice_array[gameData.dice[i]-1]
        }
      }
      for(var i = 0; i < 5; i++){
        if(gameData.diceReserved[i] == 1){
          document.getElementById('dice_'+i).setAttribute("class", "clicked");
        }
      }
      for(var i = 1; i < 7; i++){
        if(!gameData[i].length == 0){
          document.getElementById(i+"_score").value = gameData[i]
          document.getElementById(i+"_score").disabled = true;
          document.getElementById("category_"+i).setAttribute("class", "used category")
          document.getElementById("descriptor_"+i).setAttribute("class", "used descriptor")
          document.getElementById("rules_"+i).setAttribute("class", "used rules")
        }
      }
      if(!(gameData.three_kind.length == 0)){
        //console.log("GOHDE")
        document.getElementById("three_kind").value = gameData.three_kind
        document.getElementById("three_kind").disabled = true;
        document.getElementById("3KindCategory").setAttribute("class", "used category")
        document.getElementById("3KindDescriptor").setAttribute("class", "used descriptor")
        document.getElementById("3KindRules").setAttribute("class", "used rules")
      }
      if(!(gameData.four_kind.length == 0)){
        //console.log("GOHDE")
        document.getElementById("four_kind").value = gameData.four_kind
        document.getElementById("four_kind").disabled = true;
        document.getElementById("4KindCategory").setAttribute("class", "used category")
        document.getElementById("4KindDescriptor").setAttribute("class", "used descriptor")
        document.getElementById("4KindRules").setAttribute("class", "used rules")
      }
      if(!(gameData.full_house.length == 0)){
        document.getElementById("full_house").value = gameData.full_house
        document.getElementById("full_house").disabled = true;
        document.getElementById("FullHouseKindCategory").setAttribute("class", "used category")
        document.getElementById("FullHouseKindDescriptor").setAttribute("class", "used descriptor")
        document.getElementById("FullHouseKindRules").setAttribute("class", "used rules")
      }
      if(!(gameData.sm_straight.length == 0)){
        //console.log("GOHDE")
        document.getElementById("sm_straight").value = gameData.sm_straight
        document.getElementById("sm_straight").disabled = true;
        document.getElementById("SmallCategory").setAttribute("class", "used category")
        document.getElementById("SmallDescriptor").setAttribute("class", "used descriptor")
        document.getElementById("SmallRules").setAttribute("class", "used rules")
      }
      if(!(gameData.lg_straight.length == 0)){
        document.getElementById("lg_straight").value = gameData.lg_straight
        document.getElementById("lg_straight").disabled = true;
        document.getElementById("LargeCategory").setAttribute("class", "used category")
        document.getElementById("LargeDescriptor").setAttribute("class", "used descriptor")
        document.getElementById("LargeRules").setAttribute("class", "used rules")
      }
      if(!(gameData.yahtzee.length == 0)){
        document.getElementById("yahtzee").value = gameData.yahtzee
        document.getElementById("yahtzee").disabled = true;
        document.getElementById("YahtzeeCategory").setAttribute("class", "used category")
        document.getElementById("YahtzeeDescriptor").setAttribute("class", "used descriptor")
        document.getElementById("YahtzeeRules").setAttribute("class", "used rules")
      }
      if(!(gameData.chance.length == 0)){
        document.getElementById("chance").value = gameData.chance
        document.getElementById("chance").disabled = true;
        document.getElementById("ChanceCategory").setAttribute("class", "used category")
        document.getElementById("ChanceDescriptor").setAttribute("class", "used descriptor")
        document.getElementById("ChanceRules").setAttribute("class", "used rules")
      }
      sumCatagories();
      console.log(JSON.parse(localStorage.getItem(gameData.username)))
    }
  });
}

function lowerCategoryValid(){
  threeOfAKind();
  fourOfAKind();
  fullHouse();
  smallStraight();
  largeStraight();
  yahtzee();
  chance();
}

function nameValid(){
  document.getElementById("login").addEventListener('keyup', function(){
    if(event.keyCode === 13){
      var damonCharacters = ['<','>','~','/','&','%','$']
      name = this.value;
      var badName = false;
      damonCharacters.forEach(function(letter){
        if(name.includes(letter))
        badName = true;
      })
      if(badName){
        document.getElementById("warning").setAttribute("class", "visible")
      }
      else{
        document.getElementById("warning").setAttribute("class", "notVisible")
        this.disabled = true;
        document.getElementById("name").innerHTML = "Welcome, " + name;
      }
    }
  });
}

var sumCatagories = function(){
  total_score = 0;
  total_upper = 0;
  total_lower = 0;
  for(var i = 1; i< 7; i++){
    //console.log(document.getElementById(i+"_score").value);
    if(document.getElementById(i+"_score").value)
    total_score += parseInt(document.getElementById(i+"_score").value);
  }
  if(total_score >= 63){
    document.getElementById("bonus").innerHTML = 35;
    total_upper = total_score + 35;
  }
  else {
    total_upper = total_score;
  }
  if(document.getElementById("three_kind").value)
  total_lower += parseInt(document.getElementById("three_kind").value)
  if(document.getElementById("four_kind").value)
  total_lower += parseInt(document.getElementById("four_kind").value)
  if(document.getElementById("full_house").value)
  total_lower += parseInt(document.getElementById("full_house").value)
  if(document.getElementById("sm_straight").value)
  total_lower += parseInt(document.getElementById("sm_straight").value)
  if(document.getElementById("lg_straight").value)
  total_lower += parseInt(document.getElementById("lg_straight").value)
  if(document.getElementById("yahtzee").value)
  total_lower += parseInt(document.getElementById("yahtzee").value)
  if(document.getElementById("chance").value)
  total_lower += parseInt(document.getElementById("chance").value)

  grand_total = total_upper + total_lower

  document.getElementById("total_lower").innerHTML = total_lower;
  document.getElementById("total_upper").innerHTML = total_upper;
  document.getElementById("totalUpper").innerHTML = total_upper;
  document.getElementById("grand_total").innerHTML = grand_total;
}

function questionDice(){
  for(var i = 0; i<5; i++){
    document.getElementById('dice_'+ i).innerHTML = '<img src="images/question.png" height="40" width="40">';
  }
}

function rollDice(){
  roll_button.addEventListener('click', function(){//ROLL DICE ----------------------
    if(turnCount<13 && rollCount < 3){
      diceArray = [];
      rollCount++;
      for (var i = 0; i < 5; i++){
        var random_number = Math.floor(Math.random()*6);
        if(document.getElementById("dice_"+i).getAttribute("class") == "notClicked"){
          document.getElementById('dice_'+ i).innerHTML = dice_array[random_number];
        }
        diceArray.push(document.getElementById("dice_"+i).childNodes[0].src.charAt((document.getElementById("dice_"+i).childNodes[0].src).length-5));
      }
    }
    diceRolled = true;
    //console.log(diceArray)
  }); //ROLL DICE END -------------------
}

function diceReserve(){
  for (var i =0; i < 5; i++){ //DICE RESERVE -----------------------
    var chooseDie = document.getElementById("dice_" +i);
    chooseDie.addEventListener('click', function(){
      if(document.getElementById("dice_0").innerHTML.indexOf("svg")+1){
        if(this.getAttribute("class")== "notClicked")
        this.setAttribute("class", "clicked");
        else
        this.setAttribute("class", "notClicked");
      }
    });
  } //DICE RESERVE END --------------------
}

function upperCategoryValid(){
  for (var i = 1; i < 7; i++){ //UPPER CATEGORY DATA VALIDATION -- MOUSE OUT --------------
    var upperCategoryNumbers = document.getElementById(i+"_score");
    upperCategoryNumbers.addEventListener('keyup', function(){
      if (event.keyCode === 13) {
        if(diceRolled){
          var value = this.value;
          var category_var = this.parentNode.id.charAt(this.parentNode.id.length-1);
          category_var = parseInt(category_var);
          var sum = 0;
          diceArray.forEach(function(roll){
            if(roll == category_var)
            sum += category_var;
          })
          if(sum == value || value == 0){//NEW TURN///// RESET EVERYTHING /////////////////////////
            turnCount++;
            rollCount = 0;
            questionDice();
            sumCatagories();
            this.disabled = true;
            //document.getElementById("category_"+this.id.charAt(0)).innerHTML = value;
            document.getElementById("total_score").innerHTML = (total_score)
            document.getElementById("warning").setAttribute("class", "notVisible")
            document.getElementById("category_"+this.id.charAt(0)).setAttribute("class", "used category")
            document.getElementById("descriptor_"+this.id.charAt(0)).setAttribute("class", "used descriptor")
            document.getElementById("rules_"+this.id.charAt(0)).setAttribute("class", "used rules")
            diceRolled = false;
            for(var i = 0; i<5; i++){
              document.getElementById("dice_"+i).setAttribute("class", "notClicked");
            }
          }
          else{ // WARNINGG MESSAGE ///////////////////////////////
            document.getElementById("warning").setAttribute("class", "visible")
          }
        }
      }
    });
  } //UPPER CATEGORY DATA VALIDATION -- MOUSE OUT -- END -------------
}

function threeOfAKind(){
  document.getElementById('three_kind').addEventListener('keyup', function(){
    if (event.keyCode === 13) {
      if(diceRolled){
        var value = this.value;
        console.log("Entered: " + value)
        var properScore = 0;
        diceArray.forEach(function(diceScore){
          properScore += parseInt(diceScore);
        })
        console.log(diceArray)
        console.log("proper score: " + properScore)
        if(value == properScore || value == 0){ /////////////BEGIN STEP TWO OF DATA VAILIDATION////////
          var sortedDiceArray = diceArray.sort();
          console.log("sortedDiceArray: " + sortedDiceArray)
          var isThereAThreeOfAKind = false;
          for(var i = 0; i < 3; i++){
            if(sortedDiceArray[i] == sortedDiceArray[i+1] && sortedDiceArray[i] == sortedDiceArray[i+2]){
              isThereAThreeOfAKind = true;
              console.log("YAY DAMON")
              break;
            }
          }
          if(isThereAThreeOfAKind || value == 0){ ////////////////////////CORRECT SCORE ENTERED /////////////
            turnCount++;
            rollCount = 0;
            questionDice();
            sumCatagories();
            this.disabled = true;
            document.getElementById("warning").setAttribute("class", "notVisible")
            document.getElementById("3KindCategory").setAttribute("class", "used category")
            document.getElementById("3KindDescriptor").setAttribute("class", "used descriptor")
            document.getElementById("3KindRules").setAttribute("class", "used rules")
            diceRolled = false;
            for(var i = 0; i<5; i++){
              document.getElementById("dice_"+i).setAttribute("class", "notClicked");
            }
          }
          else{//////////////////////////////NO THREE OF A KIND/////////////////
            document.getElementById("warning").setAttribute("class", "visible")
          }
        }
        else{
          document.getElementById("warning").setAttribute("class", "visible")
        }
      }
    }
  });
}

function fourOfAKind(){
  document.getElementById('four_kind').addEventListener('keyup', function(){
    if (event.keyCode === 13) {
      if(diceRolled){
        var value = this.value;
        console.log("Entered: " + value)
        var properScore = 0;
        diceArray.forEach(function(diceScore){
          properScore += parseInt(diceScore);
        })
        console.log(diceArray)
        console.log("proper score: " + properScore)
        if(value == properScore || value == 0){ /////////////BEGIN STEP TWO OF DATA VAILIDATION////////
          var sortedDiceArray = diceArray.sort();
          console.log("sortedDiceArray: " + sortedDiceArray)
          var isThereAFourOfAKind = false;
          for(var i = 0; i < 2; i++){
            if(sortedDiceArray[i] == sortedDiceArray[i+1] && sortedDiceArray[i] == sortedDiceArray[i+2] && sortedDiceArray[i] == sortedDiceArray[i+3]){
              isThereAFourOfAKind = true;
              console.log("YAY DAMON")
              break;
            }
          }
          if(isThereAFourOfAKind || value == 0){ ////////////////////////CORRECT SCORE ENTERED /////////////
            turnCount++;
            rollCount = 0;
            questionDice();
            sumCatagories();
            this.disabled = true;
            document.getElementById("warning").setAttribute("class", "notVisible")
            document.getElementById("4KindCategory").setAttribute("class", "used category")
            document.getElementById("4KindDescriptor").setAttribute("class", "used descriptor")
            document.getElementById("4KindRules").setAttribute("class", "used rules")
            diceRolled = false;
            for(var i = 0; i<5; i++){
              document.getElementById("dice_"+i).setAttribute("class", "notClicked");
            }
          }
          else{//////////////////////////////NO FOUR OF A KIND/////////////////
            document.getElementById("warning").setAttribute("class", "visible")
          }
        }
        else{ ////////////////////////????WRONG SCORE ENTERD/////////////////////////
          document.getElementById("warning").setAttribute("class", "visible")
        }
      }
    }
  });
}

function fullHouse(){
  document.getElementById('full_house').addEventListener('keyup', function(){
    if (event.keyCode === 13) {
      if(diceRolled){
        var value = this.value;
        var properScore = 25;
        if(properScore == value || value == 0){ /////////////BEGIN STEP TWO OF DATA VAILIDATION///////
          var sortedDiceArray = diceArray.sort();
          var isThereAFullHouse  = false;
          if((sortedDiceArray[0] == sortedDiceArray[1]) && (sortedDiceArray[1] != sortedDiceArray[2]) && (sortedDiceArray[2] == sortedDiceArray[3]) && (sortedDiceArray[3] == sortedDiceArray[4])){
            isThereAFullHouse = true;
            console.log(sortedDiceArray)
          }
          sortedDiceArray.reverse()
          if((sortedDiceArray[0] == sortedDiceArray[1]) && (sortedDiceArray[1] != sortedDiceArray[2]) && (sortedDiceArray[2] == sortedDiceArray[3]) && (sortedDiceArray[3] == sortedDiceArray[4])){
            isThereAFullHouse = true;
            console.log(sortedDiceArray)
          }
          if(isThereAFullHouse || value ==0){////////////////////////CORRECT SCORE ENTERED ////////
            turnCount++;
            rollCount = 0;
            questionDice();
            sumCatagories();
            this.disabled = true;
            document.getElementById("warning").setAttribute("class", "notVisible")
            document.getElementById("FullHouseKindCategory").setAttribute("class", "used category")
            document.getElementById("FullHouseKindDescriptor").setAttribute("class", "used descriptor")
            document.getElementById("FullHouseKindRules").setAttribute("class", "used rules")
            diceRolled = false;
            for(var i = 0; i<5; i++){
              document.getElementById("dice_"+i).setAttribute("class", "notClicked");
            }
          }
          else{ /////////////////////////////////NO FULL HOUSE
            document.getElementById("warning").setAttribute("class", "visible")
            console.log("second damon")
          }
        }else{ ////////////////////////????WRONG SCORE ENTERD////////////////////////
          console.log("first damon")
          document.getElementById("warning").setAttribute("class", "visible")
        }
      }
    }
  });
}

function smallStraight(){
  document.getElementById('sm_straight').addEventListener('keyup', function(){
    if (event.keyCode === 13) {
      if(diceRolled){
        var value = this.value;
        var properScore = 30;
        if(properScore == value || value == 0){ /////////////BEGIN STEP TWO OF DATA VAILIDATION///////
          var sortedDiceArray = diceArray.sort();
          var sortedDiceList = sortedDiceArray.toString();
          var isThereASmStraight  = false;
          console.log(sortedDiceArray)
          if(sortedDiceList.includes(1) && sortedDiceList.includes(2) && sortedDiceList.includes(3) && sortedDiceList.includes(4)){
            isThereASmStraight  = true;
          }else if(sortedDiceList.includes(2) && sortedDiceList.includes(3) && sortedDiceList.includes(4) && sortedDiceList.includes(5)){
            isThereASmStraight  = true;
          }else if(sortedDiceList.includes(3) && sortedDiceList.includes(4) && sortedDiceList.includes(5) && sortedDiceList.includes(6)){
            isThereASmStraight  = true;
          }
          if(isThereASmStraight || value == 0){////////////////////////CORRECT SCORE ENTERED ////////
            turnCount++;
            rollCount = 0;
            questionDice();
            sumCatagories();
            this.disabled = true;
            document.getElementById("warning").setAttribute("class", "notVisible")
            document.getElementById("SmallCategory").setAttribute("class", "used category")
            document.getElementById("SmallDescriptor").setAttribute("class", "used descriptor")
            document.getElementById("SmallRules").setAttribute("class", "used rules")
            diceRolled = false;
            for(var i = 0; i<5; i++){
              document.getElementById("dice_"+i).setAttribute("class", "notClicked");
            }
          }
          else{ /////////////////////////////////NO FULL HOUSE
            document.getElementById("warning").setAttribute("class", "visible")
            console.log("second damon")
          }
        }else{ ////////////////////////????WRONG SCORE ENTERD////////////////////////
          console.log("first damon")
          document.getElementById("warning").setAttribute("class", "visible")
        }
      }
    }
  });
}

function largeStraight(){
  document.getElementById('lg_straight').addEventListener('keyup', function(){
    if (event.keyCode === 13) {
      if(diceRolled){
        var value = this.value;
        var properScore = 40;
        if(properScore == value || value == 0){ /////////////BEGIN STEP TWO OF DATA VAILIDATION///////
          var sortedDiceArray = diceArray.sort();
          var isThereALgStraight  = false;
          console.log(sortedDiceArray)
          if((sortedDiceArray[0] == sortedDiceArray[1]-1) && (sortedDiceArray[1] == sortedDiceArray[2]-1) && (sortedDiceArray[2] == sortedDiceArray[3]-1) && (sortedDiceArray[3] == sortedDiceArray[4]-1))
          isThereALgStraight  = true;
          if(isThereALgStraight || value == 0){////////////////////////CORRECT SCORE ENTERED ////////
            turnCount++;
            rollCount = 0;
            questionDice();
            sumCatagories();
            this.disabled = true;
            document.getElementById("warning").setAttribute("class", "notVisible")
            document.getElementById("LargeCategory").setAttribute("class", "used category")
            document.getElementById("LargeDescriptor").setAttribute("class", "used descriptor")
            document.getElementById("LargeRules").setAttribute("class", "used rules")
            diceRolled = false;
            for(var i = 0; i<5; i++){
              document.getElementById("dice_"+i).setAttribute("class", "notClicked");
            }
          }
          else{ /////////////////////////////////Large lg_straight
            document.getElementById("warning").setAttribute("class", "visible")
            console.log("second damon")
          }
        }else{ ////////////////////////????WRONG SCORE ENTERD////////////////////////
          console.log("first damon")
          document.getElementById("warning").setAttribute("class", "visible")
        }
      }
    }
  });
}

function yahtzee(){
  document.getElementById('yahtzee').addEventListener('keyup', function(){
    if (event.keyCode === 13) {
      if(diceRolled){
        var value = this.value;
        var properScore = 50;
        var sortedDiceArray = diceArray.sort();
        if(properScore == value || value == 0){ /////////////BEGIN STEP TWO OF DATA VAILIDATION///////
          var isThereYahtzee  = false;
          if((sortedDiceArray[0] == sortedDiceArray[1]) && (sortedDiceArray[0] == sortedDiceArray[2]) && (sortedDiceArray[0] == sortedDiceArray[3]) && (sortedDiceArray[0] == sortedDiceArray[4]))
          isThereYahtzee = true;
          if(isThereYahtzee || value == 0){////////////////////////CORRECT SCORE ENTERED ////////
            turnCount++;
            rollCount = 0;
            questionDice();
            sumCatagories();
            this.disabled = true;
            document.getElementById("warning").setAttribute("class", "notVisible")
            document.getElementById("YahtzeeCategory").setAttribute("class", "used category")
            document.getElementById("YahtzeeDescriptor").setAttribute("class", "used descriptor")
            document.getElementById("YahtzeeRules").setAttribute("class", "used rules")
            diceRolled = false;
            for(var i = 0; i<5; i++){
              document.getElementById("dice_"+i).setAttribute("class", "notClicked");
            }
          }
          else{ /////////////////////////////////Large lg_straight
            document.getElementById("warning").setAttribute("class", "visible")
            console.log("second damon")
          }
        }else{ ////////////////////////????WRONG SCORE ENTERD////////////////////////
          console.log("first damon")
          document.getElementById("warning").setAttribute("class", "visible")
        }
      }
    }
  });
}

function chance(){
  document.getElementById('chance').addEventListener('keyup', function(){
    if (event.keyCode === 13) {
      if(diceRolled){
        var value = this.value;
        var properScore = 0;
        diceArray.forEach(function(dice){properScore+=parseInt(dice)});
        if(properScore == value || value == 0){ /////////////BEGIN STEP TWO OF DATA VAILIDATION///////
          turnCount++;
          rollCount = 0;
          questionDice();
          sumCatagories();
          this.disabled = true;
          document.getElementById("warning").setAttribute("class", "notVisible")
          document.getElementById("ChanceCategory").setAttribute("class", "used category")
          document.getElementById("ChanceDescriptor").setAttribute("class", "used descriptor")
          document.getElementById("ChanceRules").setAttribute("class", "used rules")
          diceRolled = false;
          for(var i = 0; i<5; i++){
            document.getElementById("dice_"+i).setAttribute("class", "notClicked");
          }
        }
        else{ /////////////////////////////////Large lg_straight
          document.getElementById("warning").setAttribute("class", "visible")
        }
      }else{ ////////////////////////????WRONG SCORE ENTERD////////////////////////
        document.getElementById("warning").setAttribute("class", "visible")
      }
    }
  });
}
