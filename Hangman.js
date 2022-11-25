

// //Generate a Random Word from the Words Array
generateWord = (words) => {
  let randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
}

//Create the Hangman Template
const printInfo = (correctGuesses, lives, attempted, bp) => {  
  console.log(' |‾‾‾‾‾|');
  console.log(` ${bp[0]}     |`);
  console.log(`${bp[2]}${bp[1]}${bp[3]}    |`);
  console.log(` ${bp[4]}${bp[5]}    |`);
  console.log(' ‾‾‾‾‾‾');
  console.log('\n')
  
  console.log(correctGuesses.join(''));
// show player lives remaining
  console.log('Lives remaining: ' + lives);
// display incorrect guesses to the user
  console.log('Incorrect guessed: ' + attempted.join(''));
}

//Checking the user input is valid
const checkUserInput = (userInput, correctGuesses, attempted) => {
  if (!userInput) {
      alert('Please enter a valid value');
      return false;
//If more than one letter is entered alert the user and ask for a single letter input
  } else if(userInput.length > 1) {
      alert('Please enter a single letter');
      return false;

//If player has guesses a letter alert them and dont take a life from the player
  } else if(correctGuesses.includes(userInput + ' ') || attempted.includes(userInput + ' ')) {
      alert('You have already guessed: ' + userInput);
      return false;
  }

  return true;
}

//Check the players input
const checkGuess = (userInput, answer, correctGuesses, lives, attempted, all, bp) => {
  let correctGuess = false;
//if the guess is correct fill the answer in with the inputted letter
  for (let i = 0; i < answer.length; i++) {
      if(answer[i] === userInput) {
          correctGuesses[i] = userInput + ' ';
          correctGuess = true;
      }
  }
//if guess is not correct take lives from the player and begin to add the Man to the template
  if (!correctGuess) {
      lives--;
      attempted.push(userInput + ' ');
      bp[5 - lives] = all[5 - lives]
  }
//update user on number of lives
  return {bp: bp, lives: lives};
}

//Check if the game is over
const checkGameOver = (correctGuesses, lives, answer) => {
  let tempAttempts = correctGuesses.map(letter => letter[0])
//if the player lives equal 0 then the player has lost the game
  if (lives == 0) {
      alert('You have lost the game. The word was ' + answer);
      return true;
// if the player has guessed all letter correct and lives are > 0 then the playerhas won the game
  } else if(tempAttempts.join('') === answer) {
      alert("You win. The correct word was " + answer);
      return true;
  }
  return false;
}

//declarer the variables for the game
const game = () => {
//declare Array of words for the game
  const words = ["DOG",
  "ELEPHANT",
  "TIGER",
  "MONKEY",
  "GIRAFFE"];

//declate answer to be generated word
let answer = generateWord(words);
//set lives to be 6
  let lives = 6;
  
//Replace all characters in the generated word with _ 
// //This will later be used to fill in any correct guesses made by player
  let correctGuesses = new Array(answer.length).fill('_ ');
//Letters Attempted Array
  let attempted = [];
//Adding in the Hangman person
  let all = ['o', '|', '-', '-', '/', '\\'];
  let bp = [' ', ' ', ' ', ' ', ' ', ' '];

//start the game by welcoming the player
  alert('WELCOME TO HANGMAN');
//show  player the answer useing _
  alert('Your Word is ' + correctGuesses )
//Start the game loop
  while(lives > 0) {
      printInfo(correctGuesses, lives, attempted, bp);
      console.log(lives);

//change user input to upper case
      let userInput = prompt("Please enter a letter").toUpperCase();

      if (!checkUserInput(userInput, correctGuesses, attempted)) {
          continue;
      }

      let output = checkGuess(userInput, answer, correctGuesses, lives, attempted, all, bp);   
      lives = output.lives;
      bp = output.bp

      if(checkGameOver(correctGuesses, lives, answer)) {
          printInfo(correctGuesses, lives, attempted, bp);
          return;
      }
//end the game loop
  }
}

game();