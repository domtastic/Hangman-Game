// variables needed
var wins = 0;
var guessesLeft = 9;
var lettersGuessed = [];
var currentWord = "";
var songIndex = 0;

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
  "freestyle",
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
  var totalLettersGuessed = [];
  var answerArray = [];
  var currentWordArray = [];

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
      answerArray[index] = "&nbsp";
    } else {
      answerArray[index] = "_";
    }
    $("#showWord").html(answerArray.join(" "));
  }
  console.log(currentWordArray);
  // when a player presses a key convert it to a letter
  document.onkeyup = function(event) {
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(letter);

    // check to see if letter has already been guessed.
    var alreadyGuessed = totalLettersGuessed.indexOf(letter);
    if (alreadyGuessed >= 0) {
      alert("You already guessed " + letter);
    }

    totalLettersGuessed.push(letter);
    console.log(totalLettersGuessed);

    // / if it matches any of the letters, replace _ with letter --- NEED TO FIX

    var inWord = currentWordArray.indexOf(letter);
    console.log(inWord);
    if (inWord >= 0) {
      answerArray[index] = letter;
      console.log(answerArray);

      $("#showWord").html(answerArray);
    }

    // for (var index = 0; index < currentWordArray.length; index++) {
    //   if (currentWordArray[index] === letter) {
    //     answerArray[index] = letter;
    //     console.log(answerArray);

    //     $("#showWord").html(answerArray);
    //   } else {
    //     // if it is a wrong guess add to letters guessed
    //     if ((lettersGuessed.length = 0)) {
    //       lettersGuessed.push(letter);
    //     } else {
    //       lettersGuessed.push(", " + letter);
    //     }
    //     $("#letterAlreadyGuessed").html(lettersGuessed);
    //   }

    //   // subtract from guesses left
    //   // guessesLeft--;
    //   // update the html with the value
    // }

    // if guesses left = 0, you lose

    // if asnwerArray = currentWord, yoo win!

    // add 1 to win

    // rest game
  };
}
