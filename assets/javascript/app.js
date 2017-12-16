// run questions sequentially

$(document).ready(function() {
	// hide elements
	$("#controls").hide();
	$(".questionbox").hide();
	$(".answerbox").hide();
	$("#restart").hide();

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
	var timer = "";
	var index = 0;

	// trivia questions (array of objects)
	var questionSelect = [
		{qheader: "Question One",
		qtext: "First question text.",
		answer1: "Answer one.",
		answer1value: "incorrect",
		answer2: "Answer two.",
		answer2value: "correct",
		answer3: "Answer three.",
		answer3value: "incorrect",
		atext: "BLAH BLAH BLAH."},

		{qheader: "Question Two",
		qtext: "Second question text.",
		answer1: "Answer one.",
		answer1value: "correct",
		answer2: "Answer two.",
		answer2value: "incorrect",
		answer3: "Answer three.",
		answer3value: "incorrect",
		atext: "BLAH."}
	];

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
		$("#controls").delay(1500).fadeIn(1500);
		audioControls(gamemusic);

		// start game music
		$("#gamemusic").prop("volume", 0);
		setTimeout("gamemusic.play();", 3000);
		$("#gamemusic").animate({volume: 0.5}, 3500);

		//executeAsynchronously([question(0), question(1)]);	
		
		//var indexTimer = setInterval("index = index + 1; console.log(index);", 17499);
		//var runGame = setInterval(question(index), 17500);
		
		question(0);
		//setTimeout(question(0), 1000);
		//setTimeout(question(1), 10000);
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

	// timer and result of failing to select an answer
	function countDown() {
		if (remaining > 0) {
			remaining--;
			updateScreen();
		} else {
			remaining = 0;
		}

		if (remaining == 0) {
			incorrect++;
			result = "Time's Up!"
			incorrectsound.play();
			$(".questionbox").fadeOut(1000);
			$("#atext").text(questionSelect[index].atext);
			$(".answerbox").delay(1000).fadeIn(1000);
			clearInterval(timer);
			updateScreen();
			setTimeout(nextQuestion, 5000);
		}
	}

	// REFERENCE: https://stackoverflow.com/questions/5187968/how-should-i-call-3-functions-in-order-to-execute-them-one-after-the-other
	function executeAsynchronously(functions) {
  		for (var i = 0; i < functions.length; i++) {
    		setTimeout(functions[i], 17500);
  		}
	}

	// prepare to load next question
	function nextQuestion() {
		$(".answerbox").fadeOut(1500);
		remaining = 10;
		index++;
	}

	// question logic
	function question(X) {
		timer = setInterval(countDown, 1000);
		$(".questionbox").delay(1500).fadeIn(1500);

		questionText(X);

		// user selects an answer
		$(".answer").one("click", function() {
			var userAnswer = $(this).val();
			$(".questionbox").fadeOut(1000);
			$(".answerbox").delay(1000).fadeIn(1000);

			if (userAnswer == "correct") {
				correct++;
				result = "Correct!"
				correctsound.play();
				$("#atext").text(questionSelect[X].atext);
				clearInterval(timer);
				updateScreen();
				setTimeout(nextQuestion, 5000);
			} else if (userAnswer == "incorrect") {
				incorrect++;
				result = "Incorrect!"
				incorrectsound.play();
				$("#atext").text(questionSelect[X].atext);
				clearInterval(timer);
				updateScreen();
				setTimeout(nextQuestion, 5000);
			} else {
				alert("Oops! Looks like you misclicked! Please try again.");
			}
		}); 
	}

	// push questions and answers to page
	function questionText(X) {
		$("#qheader").text(questionSelect[X].qheader);
		$("#qtext").text(questionSelect[X].qtext);
		$("#answer1").text(questionSelect[X].answer1);
		$("#answer1").removeAttr("value").val(questionSelect[X].answer1value);
		$("#answer2").text(questionSelect[X].answer2);
		$("#answer2").removeAttr("value").val(questionSelect[X].answer2value);
		$("#answer3").text(questionSelect[X].answer3);
		$("#answer3").removeAttr("value").val(questionSelect[X].answer3value);
	}

	// update counters
	function updateScreen() {
		$("#correct").text(correct);
		$("#incorrect").text(incorrect);
		$("#remaining").text(remaining);
		$("#result").text(result);
	}

}); 