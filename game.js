//Global Variables

var buttonColors = ["green", "red", "yellow", "blue"];
var pattern = [];
var userPattern = [];
var level = 0;
var pressed;
var game = 0;
var flag = 0;
var counter = 1;

//Sequence

function sequence() {
  game = 1;
  $("h1").text("Level " + level);
  level++;
  var index = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[index];
  pattern.push(randomColor);
  buttonSounds(randomColor);
  setTimeout(function () {
    animation(pattern[pattern.length - 1]);
  }, 150);
  flag = 1;
  userPattern.splice(0, userPattern.length);
  userClick();
}

//Main

$(document).keydown(function () {
  if (game === 0) {
    sequence();
  }
});

// var counter = 0;
// while (counter < pattern.length) {
function userClick() {
  $(".btn")
    .off()
    .on("click", function () {
      pressed = $(this).attr("id");
      userPattern.push(pressed);
      animatePress(pressed);
      buttonSounds(pressed);

      if (counter === pattern.length) {
        counter = 1;
        checkAnswer();
      } else {
        counter++;
      }

      // counter++;
    });
}
// }

//Animations

function animation(key) {
  var className = "." + key;
  setTimeout(function () {
    $(className).delay(50).fadeOut(100).fadeIn(100);
  }, 100);
}

function animatePress(key) {
  var className = "." + key;
  $(className).addClass("pressed");
  setTimeout(function () {
    $(className).removeClass("pressed");
  }, 100);
}

//Sounds

function buttonSounds(pressedButton) {
  switch (pressedButton) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    default:
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;
  }
}

//Click Detection

// function userClick() {}

//Check Answer

function checkAnswer() {
  var len = pattern.length;
  for (var i = 0; i < len; i++) {
    if (userPattern[i] === pattern[i]) {
      flag = 0;
      console.log("success");
      if (i === pattern.length - 1) {
        // flag = 1;

        sequence();
        // } else {
        //   // upIndex++;
        //   flag = 0;
        //   userClick();
      }
    } else {
      flag = 1;
      console.log("failed");
      gameOver();
      break;
    }
  }
}

function gameOver() {
  $("h1").text("Game Over, press any key to start again!");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  game = 0;
  level = 0;
  pattern.splice(0, pattern.length);
}
