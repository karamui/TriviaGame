// make user lose when they dont answer in time
// remove continue button -> restart game
// fix timer start between questions

$(document).ready(function() {
	// hide elements
	$("#controls").hide();
	$(".questionbox").hide();
	$(".answerbox").hide();

	// declaring audio variables
	var intromusic = document.getElementById("intromusic");
	var gamemusic = document.getElementById("gamemusic");
	var correctsound = document.getElementById("correctsound");
	var incorrectsound = document.getElementById("incorrectsound");

	// declaring initial game variables
	var correct = 0;
	var incorrect = 0;
	var remaining = 10;
	var result = "";

	// play intro music on startup
	intromusic.play();
	$("#intromusic").prop("volume", 0.5);
	audioControls(intromusic);

	// begin game when user clicks start button
	$("#startgame").on("click", function startGame() {
		// fade and stop intro music
		$("#intromusic").animate({volume: 0}, 3000);
		setTimeout("intromusic.pause();", 3000);

		// fade out instructions, start button, and disclaimer
		$(".fade1").fadeOut(1500);

		// fade in controls
		$(".fade2").delay(1500).fadeIn(1500);
		audioControls(gamemusic);

		// start game music
		$("#gamemusic").prop("volume", 0);
		setTimeout("gamemusic.play();", 3000);
		$("#gamemusic").animate({volume: 0.5}, 3500);
		
		// run timer
		var timer = setInterval(countDown, 1000);
		console.log(remaining);

		if (timer == 0) {
			alert("hi");
			incorrect++;
			result = "Time's Up!"
			incorrectsound.play();
			clearInterval(timer);
			updateScreen();
		}

		// user selects an answer
		$(".answer").on("click", function() {
			var userAnswer = $(this).val();
			$("#question1").fadeOut(1000);
			$(".answerbox").delay(1000).fadeIn(1000);

			if (userAnswer == "correct" && remaining > 0) {
				correct++;
				result = "Correct!"
				correctsound.play();
				nextQuestion();
			} else if (userAnswer == "incorrect" && remaining > 0) {
				incorrect++;
				result = "Incorrect!"
				incorrectsound.play();
				nextQuestion();
			} else {
				alert("Oops! Looks like you misclicked! Please try again.");
			}
		}); 

		// 
		function nextQuestion() {
			clearInterval(timer);
			updateScreen();
			$(".fade3").delay(5000).fadeOut(1500);
			remaining = 30;
			//timer = setInterval(countDown, 1000);
		}
	});

	// audio controls
	function audioControls(music) {
		var volume = 0.5;

		$("#play").on("click", function() {
			music.play();
		});

		$("#pause").on("click", function() {
			music.pause();
		});

		$("#refresh").on("click", function() {
			music.pause();
			music.currentTime = 0;
			music.play();
		});

		$("#softer").on("click", function() {
			volume = volume - 0.1;
			music.volume = volume;
		});

		$("#louder").on("click", function() {
			volume = volume + 0.1;
			music.volume = volume;
		});
	}

	// update counters
	function updateScreen() {
		$("#correct").text(correct);
		$("#incorrect").text(incorrect);
		$("#remaining").text(remaining);
		$("#result").text(result);
	}

	// timer
	function countDown() {
		if (remaining > 0) {
			remaining--;
			updateScreen();
		} else {
			remaining = 0;
		}
	}

}); 