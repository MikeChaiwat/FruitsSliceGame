var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = [
  "apple",
  "banana",
  "cherries",
  "grapes",
  "mango",
  "orange",
  "peach",
  "pear",
  "watermelon",
];

$(function () {
  $("#startreset").click(function () {
    if (playing == true) {
      // playing click reset button
      playing = false;
      location.reload();
    } else {
      // not playing click start button
      playing = true;

      //set score to 0
      score = 0;
      $("#scorevalue").html(score);

      //show trials left
      $("#trialsleft").show();
      trialsLeft = 3;
      addHearts();

      //hide game over box
      $("#gameover").hide();

      //change button text to reset
      $("#startreset").html("Reset Game");

      //start sending fruits
      startAction();
    }
  });

  $("#fruit1").mouseover(function () {
    score++;
    $("#scorevalue").html(score); //update score value
    $("#slicesound")[0].play(); // play sound

    //stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode"); // slice fruit

    //send new fruit
    setTimeout(startAction, 500);
  });

  function addHearts() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsleft").append("<img src='images/heart.png' class='life' >");
    }
  }

  function startAction() {
    $("#fruit1").show();
    chooseFruit(); // choose a random fruit
    // random position
    $("#fruit1").css({ left: Math.round(550 * Math.random()), top: -50 });

    //generate a random step
    step = 1 + Math.round(5 * Math.random()); // change step

    // Move fruit down by one step every 10ms
    action = setInterval(function () {
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      //check if fruit too low
      if ($("#fruit1").position().top > $("#fruitscontainer").height()) {
        //check if we have trials left
        if (trialsLeft > 1) {
          $("#fruit1").show();
          chooseFruit(); // choose a random fruit
          // random position
          $("#fruit1").css({ left: Math.round(550 * Math.random()), top: -50 });

          //generate a random step
          step = 1 + Math.round(5 * Math.random()); // change step

          //reduce trials by one
          trialsLeft--;

          //populate trialsLeft box
          addHearts();
        } else {
          //game over
          playing = false;
          $("#startreset").html("Start Game");
          $("#gameover").show();
          $("#gameover").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#trialsleft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  //generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "images/" + fruits[Math.round(8 * Math.random())] + ".png"
    );
  }

  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
