// variables needed
var wins = 0;
var guessesLeft = 9;
var lettersGuessed = [];
var currentWord = "";
var songIndex = 0;
var totalLettersGuessed;
var answerArray = [];
var currentWordArray = [];
var lettersAlreadyGuessedDOM = $("#lettersAlreadyGuessed");
var soundCLick = new Audio("./assets/audio/click.mp3");
var soundError = new Audio("./assets/audio/error.mp3");
var previousWord = "0";
var music = {
  speakerbox: new Audio("./assets/audio/Bassnectar-Speakerbox.mp3"),
  "bass head": new Audio("./assets/audio/Bassnectar-Bass Head.mp3"),
  butterfly: new Audio("./assets/audio/Bassnectar-Butterfly.mp3"),
  fun: new Audio("./assets/audio/Bassnectar-FUN.mp3"),
  now: new Audio("./assets/audio/Bassnectar-Now.mp3"),
  "mind tricks": new Audio("./assets/audio/Bassnectar-Mind Tricks.mp3"),
  "you and me": new Audio("./assets/audio/Bassnectar-YouAndMe.mp3"),
  timestretch: new Audio("./assets/audio/Bassnectar-Timestretch.mp3"),
  slather: new Audio("./assets/audio/Bassnectar-Slather.mp3"),
  boombox: new Audio("./assets/audio/Bassnectar-Boombox.mp3"),
  fsof: new Audio("./assets/audio/Bassnectar-Fsosf.mp3"),
  "ping pong": new Audio("./assets/audio/Bassnectar-Ping Pong.mp3"),
  zodgilla: new Audio("./assets/audio/Bassnectar-Zodgilla.mp3")
};
//  --------------------------------------------
// array of songs that we will be guessing
//
var song = [
  "speakerbox",
  "bass head",
  "butterfly",
  "fun",
  "now",
  "mind tricks",
  "you and me",
  "timestretch",
  "slather",
  "boombox",
  "fsof",
  "ping pong",
  "zodgilla"
];

// set up game - need to change to "Press any Button"
$(".btn-success").click(setUpGame);

function setUpGame() {
  guessesLeft = 9;
  lettersGuessed = [];
  totalLettersGuessed = [];
  answerArray = [];
  currentWordArray = [];
  lettersAlreadyGuessedDOM.text("");
  console.log(previousWord);

  $("#guessesLeft").html(guessesLeft);
  $("#wins").html(wins);
  //  var letter = "";

  // computer chooses a random song from the list
  currentWord = song[Math.floor(Math.random() * song.length)];
  console.log(currentWord);

  // check to make sure the current word has not already been used, if it has been used, then reuse? BONUS

  // create "_" and "spaces" for amount of letter and show in html
  for (var index = 0; index < currentWord.length; index++) {
    currentWordArray.push(currentWord[index]);

    if (currentWord[index] === " ") {
      answerArray[index] = " ";
    } else {
      answerArray[index] = "   _   ";
    }
    $("#showWord").html(answerArray.join(" "));
  }
  console.log(currentWordArray);
  // when a player presses a key convert it to a letter
}

$(document).on("keyup", function(event) {
  var letter = String.fromCharCode(event.keyCode).toLowerCase();
  console.log(letter);

  // check to see if letter has already been guessed.
  var alreadyGuessed = totalLettersGuessed.indexOf(letter);
  if (alreadyGuessed >= 0) {
    alert("You already guessed " + letter);
  } else {
    totalLettersGuessed.push(letter);
  }

  for (var i = 0; i < currentWordArray.length; i++) {
    if (currentWordArray[i] === letter) {
      answerArray[i] = letter;
      console.log(answerArray);
      soundCLick.play();
      $("#showWord").html(answerArray);
    }
    // subtract from guesses left
    // guessesLeft--;
    // update the html with the value
  }

  if (currentWordArray.indexOf(letter) == -1 && alreadyGuessed < 0) {
    // if it is a wrong guess add to letters guessed
    if (lettersAlreadyGuessedDOM.text() == "") {
      lettersGuessed.push(letter);
    } else {
      lettersGuessed.push(", " + letter);
    }
    lettersAlreadyGuessedDOM.html(lettersGuessed);
    --guessesLeft;
    soundError.play();
    $("#guessesLeft").html(guessesLeft);
  }
  // if guesses left = 0, you lose
  if (guessesLeft === 0) {
    winsLoss("You Lose");
    // if asnwerArray = currentWord, yoo win!
  } else if (answerArray.join("") == currentWordArray.join("")) {
    winsLoss("You Win");

    // add 1 to win
    ++wins;
    if (previousWord != "0") {
      console.log("stop playing music");
      music[previousWord].pause();
      music[previousWord].currentTime = 0;
    }

    music[currentWord].play();
    previousWord = currentWord;
    console.log(previousWord);
    $("wins").html(wins);
  }

  function winsLoss(wL) {
    $("#winLoss").html(wL);
    setTimeout(wipeOut, 3000);

    // function setTimeout(func, amountOfTime) {
    //   //after amountOfTime gets done run
    //   func()
    // }
  }

  function wipeOut() {
    $("#winLoss").html("");
    // reset game
    setUpGame();
  }

  // }
});
