const crypto = require("crypto");

const {GENESIS_SECRET} = require('./constants')// This number may NOT be leaked

//Hash from ethereum block #XXXXX. See https://etherscan.io/blocks
// https://etherscan.io/block/13626940
// Mined by
// public seed
const salt = "0xea674fdde714fd979de3edf0f56aa9716b898ec8";

//just for GENESIS_SECRET
function generateInitialRandomHex(length = 64) {
    return crypto.randomBytes(length).toString('hex');
}

function saltHash(hash) {
  return crypto.createHmac("sha256", hash).update(salt).digest("hex");
}

function generateHash(seed) {
  return crypto.createHash("sha256").update(seed).digest("hex");
}

function generateListOfHashes(totalHashes = 5) {
    const arr = [];
    lastGame = totalHashes;
    lastHash = generateHash(GENESIS_SECRET);

    // IMPORTANT: Order of the hashes. Last GameID has the first hash dubbed lastHash. First GameID has last hash of the hash chain!
    arr.push([lastGame, lastHash]); // Write to database

    for (i=1; i<totalHashes; i++){

        var gameNumber = totalHashes-i;
        hash = generateHash(arr[i-1][1]);
        arr.push([gameNumber, hash]);
    }

    return arr;
}

///////////////////////////////////////////////////////////////////////////////////////
// These are the functions to generate the crash factor from a hash                  //
///////////////////////////////////////////////////////////////////////////////////////


function divisible(hash, mod) {
  // We will read in 4 hex at a time, but the first chunk might be a bit smaller
  // So ABCDEFGHIJ should be chunked like  AB CDEF GHIJ
  var val = 0;

  var o = hash.length % 4;
  for (var i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
    val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
  }

  return val === 0;
}

function crashPointFromHash(crashHash) {
  const hash = crypto
    .createHmac("sha256", crashHash)
    .update(salt)
    .digest("hex");


// this is the house edge of 5%
  const hs = parseInt(100 / 5);
  if (divisible(hash, hs)) {
    return 1;
  }

  const h = parseInt(hash.slice(0, 52 / 4), 16);
  const e = Math.pow(2, 52);

  return Math.floor((100 * e - h) / (e - h)) / 100.0;
}


///////////////////////////////////////////////////////////////////////////////////////
// These are the functions for the user to verify the crash from previous game hashes//
///////////////////////////////////////////////////////////////////////////////////////



function getPreviousGames(crashHash) {
  const previousGames = [];
  let gameHash = generateHash(crashHash);

  for (let i = 0; i < 5; i++) {
    const gameResult = crashPointFromHash(gameHash);
    previousGames.push({ gameHash, gameResult });
    gameHash = generateHash(gameHash);
  }

  return previousGames;
}

function verifyCrash(crashHash) {
  const gameResult = crashPointFromHash(crashHash);
  const previousHundredGames = getPreviousGames(crashHash);

  return { gameResult, previousHundredGames };
}

// console.log(verifyCrash('fb9837dc8f32b9f2ce42442ae10f68424d836e34f0632b0c4b8b28097eb7560f'));

module.exports = {
    verifyCrash,
    getPreviousGames,
    crashPointFromHash,
    generateListOfHashes
}
