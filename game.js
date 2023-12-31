var gamePattern=[];
var userClickedPattern = [];
var level = 0;
var i=true;
var buttonColours = ["red","blue","green","yellow"];
function nextSequence() {
   userClickedPattern = [];
   level++;
   $("#level-title").text("Level " + level);
   var randomNumber = Math.random();
   randomNumber*=4;
   randomNumber=Math.floor(randomNumber);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}
$(".btn").click(function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length)-1);
});
function playSound(name) {
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour) {
       $("#"+currentColour).addClass("pressed");
       setTimeout(function () {
         $("#"+currentColour).removeClass("pressed");
       },100);
}
$(document).on("keypress",function() {
      if(i)
      {
        $("#level-title").text("Level "+level);
        nextSequence();
        i=false;
      }
});
function checkAnswer(currentLevel) {
      if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
      {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
          setTimeout(function () {
               nextSequence();
          },1000);
        }
      }
      else
      {
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
      }
}
function startOver() {
   level = 0;
   gamePattern=[];
   i=true;
}
