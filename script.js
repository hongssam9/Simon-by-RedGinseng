/* Getting all the buttons */
let pinkCircle = document.querySelector("#pinkButton");
let blueCircle = document.querySelector("#blueButton");
let redCircle = document.querySelector("#redButton");
let purpleCircle = document.querySelector("#purpleButton");
let greenCircle = document.querySelector("#greenButton");
let startButton = document.querySelector("#startButton");
let againButton = document.querySelector(".againButton");
let title = document.querySelector('#title');
let currentLevel = document.querySelector(".counter"); //Updates innerHTML for level
let winnerImage = document.querySelector("#winnerImage");
let loserImage = document.querySelector("#loserImage");

let level = null; //To Keep track of level
let player = []; //Keeps track of player's decisions
let currentSequence = []; //Keeps track of winning sequence
let sequenceIndex = 0; //Reading the currentSequence from 0, allowing circles to light up along the way
let playerTurn = null; // keeps track of whose turn it is
let computerTurn = null; // keeps track of whose turn it is
let repeatFunction = null; //IDK
let goToNextLevel = null; //going to next level condition

const audioC = new Audio('audio/C_note.wav')
const audioD = new Audio('audio/D_note.wav')
const audioE = new Audio('audio/E_note.wav')
const audioF = new Audio('audio/F_note.wav')
const audioG = new Audio('audio/G_note.wav')
const audiofunk = new Audio('audio/funkydog.wav')
const wow = new Audio('audio/wow.wav')

/* Selects all circle buttons */
const circles = document.querySelectorAll(".memoryButt");
/* ================================================================================ */
/* Starting a new game and makes a new array of random numbers*/
startButton.addEventListener("click", () => {
  title.style.opacity = 0;
  title.style.pointerEvents = "none";
  winnerImage.style.pointerEvents = "none";
  loserImage.style.pointerEvents= "none"
  startConditions();
  start();
});



const startConditions = () => {
  currentSequence = [];
  player = [];
  level = 1;
  repeatFunction = 0;
  againButton.style.opacity = 0;
};

let previousColor; //variable to help with duplicate colors
//Let the circle lighting begin!
const start = () => {
  
  playerTurn = false;
  startButton.style.opacity = 0;
  currentLevel.innerHTML = level;
  if(level == 1){
  for (let i = 0; i < 15; i++) {
    currentSequence.push(Math.floor(Math.random() * 5) + 1);
  }
  console.log(currentSequence); //checks array of random numbers
}
 
  computerTurn = true;
  setTimeout(() => {
    for (let i = 0; i < currentSequence.length; i++) {
      if (i == level) {
        resetColors();
        computerTurn = false;
        playerTurn = true;
      }
      //console.log(previousColor, currentSequence[i]);
      let extraTimer = previousColor == currentSequence[i]; //
      //console.log(extraTimer);
      previousColor = currentSequence[i];
      //Checking to see which number matches the array index
      if (computerTurn == true) {
        setTimeout(() => {
          resetColors();
          setTimeout(() => {
            if (currentSequence[i] == 1) {
              blinkPink();
              audioC.play();
            } else if (currentSequence[i] == 2) {
              blinkBlue();
              audioD.play();
            } else if (currentSequence[i] == 3) {
              blinkRed();
              audioE.play();
            } else if (currentSequence[i] == 4) {
              blinkPurple();
              audioF.play();
            } else if (currentSequence[i] == 5) {
              blinkGreen();
              audioG.play();
            } else {
            }
          }, extraTimer * 200); //When there's a duplicate color right after, this line helps with resetting the color and flashing it again.
        }, 800 * i);
      } else {
      }
    }
  }, 800);
};

/* ================================================================================ */

/* Functions to blink specific color */
const blinkPink = () => {
  pinkCircle.style.opacity = 1;
};
const blinkBlue = () => {
  blueCircle.style.opacity = 1;
};
const blinkRed = () => {
  redCircle.style.opacity = 1;
};
const blinkPurple = () => {
  purpleCircle.style.opacity = 1;
};
const blinkGreen = () => {
  greenCircle.style.opacity = 1;
};

//Records player's ipnut into an array
//After each push, the check function activates
pinkCircle.addEventListener("click", () => {
  player.push(1);
  audioC.play();
  check();
});
blueCircle.addEventListener("click", () => {
  player.push(2);
  audioD.play();
  check();
});
redCircle.addEventListener("click", () => {
  player.push(3);
  audioE.play();
  check();
});
purpleCircle.addEventListener("click", () => {
  player.push(4);
  audioF.play();
  check();
});
greenCircle.addEventListener("click", () => {
  player.push(5);
  audioG.play();
  check();
});

/* ================================================================================ */

//checking condition
const check = () => {
  //condition for correct pattern
  //checks each index pressed in the player and current Sequence
  if (player[player.length - 1] == currentSequence[player.length - 1]) {
    goToNextLevel = true;
    checkTwo();
    //condition for wrong pattern
    //if player pressed the wrong one, sets goToNextLevel to false, activates Loser
  } else if (
    player[player.length - 1] != currentSequence[currentSequence - 1]
  ) {
    goToNextLevel = false;
    checkTwo();
  } else {
  }
};

const checkTwo = () => {
  if (goToNextLevel == true) {
    if (player.length == 15) {
      winner();
    } else if (player.length == level) {
      level++;
      player = [];
      currentLevel.innerHTML = level;
      computerTurn = true;
      start();
    }
  } else {
    loser();
  }
};

/* ================================================================================ */
//Win or Lose with try again function
const loser = () => {
  resetColors();
  currentLevel.innerHTML = "Nope";
  againButton.style.opacity = 1;
  againButton.style.pointerEvents = "auto";
  loserImage.style.opacity = 1;
  wow.play();
  againButton.addEventListener('click', () => {
    againButton.style.pointerEvents = "none";
    loserImage.style.opacity = 0; 
    startConditions();
    start();
  })
};

const winner = () => {
  currentLevel.innerHTML = "Winner!";
  againButton.style.opacity = 1;
  againButton.style.pointerEvents = "auto";
  winnerImage.style.opacity = 1;
  audiofunk.play();
  againButton.addEventListener('click', () => {
    againButton.style.pointerEvents = "none";
    winnerImage.style.opacity = 0;
    startConditions();
    start();
  })
 
};

/* ================================================================================ */

/* Resets all circles to 30% */
const resetColors = () => {
  pinkCircle.style.opacity = 0.3;
  blueCircle.style.opacity = 0.3;
  redCircle.style.opacity = 0.3;
  purpleCircle.style.opacity = 0.3;
  greenCircle.style.opacity = 0.3;
};

/* When clicked, circle lights up 100%*/
const clickCircle = circles.forEach((circle) =>
  circle.addEventListener("click", (event) => {
    //console.log("Hotpot");
    event.target.style.opacity = 1;
    setTimeout(() => {
      circle.style.opacity = 0.3;
    }, 200);
  })
);

/* functions for when the cursor goes in the circle, the circle lights up to 70%  */
const enterCircle = circles.forEach((circle) => 
  circle.addEventListener("mouseenter", (event) => {
    //console.log("in");
    event.target.style.opacity = 0.7;
  })
);

/* Circle goes back to 0.3 when cursor leaves the circle */
const leaveCircle = circles.forEach((circle) =>
  circle.addEventListener("mouseleave", (event) => {
    //console.log('out');
    event.target.style.opacity = 0.3;
  })
);

/* 
References:
https://jsfiddle.net/ayoisaiah/Lxwhder6/20/
https://www.youtube.com/watch?v=n_ec3eowFLQ&ab_channel=freeCodeCamp.org
https://medium.com/front-end-weekly/create-simon-game-in-javascript-d53b474a7416

*/
