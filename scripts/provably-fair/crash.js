function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function newRound() {

    players = Math.floor(getRandomArbitrary(2,21)); //sample 1-20 users
    outcome = Create2DArray(players,6)

    outcome[0] = [1.0, 0, 0, 0, 0, 0];

    for (let i=1; i < players; i++){

        outcome[i][0] = getRandomArbitrary(1,10).toFixed(2); // factor
        outcome[i][1] = getRandomArbitrary(1,10).toFixed(2); // value

    }
    outcome.push([MAX_CRASHFACTOR, 0, 0, 0, 0, 0]); 

    return outcome

}


function Create2DArray(rows, cols) {
  
    return arr = Array(rows).fill(null).map(() => Array(cols));

}



function getSortedGame(game) {

    MAX = game.length;
  
    game.sort(function(a,b) {
        return a[0]-b[0]
    });

    // compute paypout

    for (let i=0; i < MAX; i++){

        game[i][2] =  (game[i][0] *  game[i][1]).toFixed(2);
    }

    // compute casino loss
    game[0][3]=game[0][2];
    for (let i=1; i < MAX; i++){

        game[i][3]= (parseFloat(game[i-1][3]) + parseFloat(game[i][2])).toFixed(2);
 
    }

    // compute casino wins
    
    game[MAX-1][4] = parseFloat(0);
    if (MAX>1){
        for (let i=MAX-2; i >=0; i=i-1){
            game[i][4]=  (parseFloat(game[i+1][2]) + parseFloat(game[i+1][4])).toFixed(2);
        }
    } 

    // compute win/loss

    for (let i=0; i < MAX; i++){

        game[i][5]= (parseFloat(parseFloat(game[i][4]) - game[i][3])).toFixed(2);
 
    }

    return game;


}


function getWinBounds(sortedGame) {

    winIndices = new Array;
    var ctr;

    for (let i=0; i < sortedGame.length; i++) {
        
        if (sortedGame[i][5] > 0) {
            ctr=i;
            winIndices.push([sortedGame[i][0], sortedGame[i][5]])
        }

    }
  
    winIndices.push([ sortedGame[ctr+1][0], sortedGame[ctr+1][5]] );

    return winIndices;
}


function getLossBounds(sortedGame) {


    lossIndices = new Array;
    var ctr;

    for (let i=0; i < sortedGame.length; i++) {
        
        if (sortedGame[i][5] < 0) {
            ctr=i;
            lossIndices.push([sortedGame[i][0], sortedGame[i][5]])
        }

    }
  
    lossIndices.push([ sortedGame[ctr][0], sortedGame[ctr][5]] );

    return lossIndices;
}

function chooseLossCrashFactor(mode, lossIndices) {

    if (mode == "low"){ //lowest loss in the round
        min = lossIndices[0][0];
        max =  lossIndices[1][0];
        loss = lossIndices[0][1];
    }

    if (mode == "high"){ //highest possible loss in the round
        pos = lossIndices.length;
        min = lossIndices[pos-3][0];
        max = lossIndices[pos-1][0];
        loss = lossIndices[pos-1][1];
    }

    if (mode == "rand"){ //random sampling of the loss in the round
        pos = Math.floor(getRandomArbitrary(0,lossIndices.length-1));
      
        if (pos >1 ){

            min = lossIndices[pos-2][0];
            max = lossIndices[pos-1][0];
            loss = lossIndices[pos-2][1];
        }
        else{

            min = lossIndices[0][0];
            max = lossIndices[1][0];
            loss = lossIndices[0][1];

        }
    }
    crashFactor = getRandomArbitrary(parseFloat(min), parseFloat(max));
    crashFactor=(Math.floor(crashFactor*100)/100);
    return [crashFactor, loss];

}

function chooseWinCrashFactor(mode, winIndices) {

    if (mode == "low"){ //lowest win in the round
        min = winIndices[0][0];
        max =  winIndices[1][0];
        win = winIndices[0][1];
    }

    if (mode == "high"){ //highest possible win in the round
        pos = winIndices.length;
        min = winIndices[pos-2][0];
        max = winIndices[pos-1][0];
        win = winIndices[pos-2][1];
    }

    if (mode == "rand"){ //random sampling of the win in the round
        pos = Math.floor(getRandomArbitrary(0,winIndices.length-1));
      
        if (pos >1 ){

            min = winIndices[pos-2][0];
            max = winIndices[pos-1][0];
            win = winIndices[pos-2][1];
        }
        else{

            min = winIndices[0][0];
            max = winIndices[1][0];
            win = winIndices[0][1];

        }
    }
    crashFactor = getRandomArbitrary(parseFloat(min), parseFloat(max));
    crashFactor=(Math.floor(crashFactor*100)/100);
    return [crashFactor, win];

}


function maximize(sortedGame) {         // sample reward making crash factor

    winIndices = getWinBounds(sortedGame);
    [crashFactor, win] = chooseWinCrashFactor("rand", winIndices);
   
    return [crashFactor, win];


}


function minimize(sortedGame) {         // sample loss making crash factor

    lossIndices = getLossBounds(sortedGame);
    [crashFactor, loss] = chooseLossCrashFactor("rand", lossIndices);
  
    return [crashFactor, loss] ;


}

// main program

const MAX_CRASHFACTOR = 100;
const MAX_BALANCE = 2000;
const MIN_BALANCE = 1000;
const TARGET_BALANCE = 1600;
const MAX_ROUNDS = 100;

var BALANCE = 1600;

for (i=1; i < 100; i++){

    round = newRound();
    sortedGame = getSortedGame(round);
 
    // casino makes money
    if (BALANCE <= TARGET_BALANCE) {  
        [crash_factor, win] = maximize(sortedGame);
        console.log(crash_factor, ",", win, ",", BALANCE= BALANCE + parseInt(win))
    }
    // casino loses money
    if (BALANCE >   TARGET_BALANCE  ) {  
        [crash_factor, loss] = minimize(sortedGame);
        console.log(crash_factor, ",", loss, ",", BALANCE= BALANCE + parseInt(loss))

    }
    


}


