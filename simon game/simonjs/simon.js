var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started=false;
//player press a button
$("body").keypress(function() {
  if(!started){
  nextSequence();
  started=true;
    }
})
var level = 0;
//function to take input
function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColors = buttonColors[randomNumber];
  gamePattern.push(randomChosenColors);
  animate(randomChosenColors);
  playSound(randomChosenColors);

  $("#level-title").text("Level " + level);
};


//button pressed from the user side
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animate(userChosenColor);
  animatePress(userChosenColor);
  checkAnwer(userClickedPattern.length - 1);
});

// for animation in button
// if (userClickedPattern.length === gamePattern.length) {
//   setTimeout(function() {
//     nextSequence();
//   }, 1000);
// }


function checkAnwer(currLevel) {
  if (userClickedPattern[currLevel] === gamePattern[currLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }else {
    var audio=  new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over ,Press any key to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
//function to animate t
function animate(randomChosenColors) {
  $("#" + randomChosenColors).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

//function to play sound;
function playSound(randomChosenColors) {
  var audio = new Audio('sounds/' + randomChosenColors + '.mp3');
  audio.play();
}
