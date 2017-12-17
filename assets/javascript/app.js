$(document).ready(function() {
	// hide elements
	$("#controls").hide();
	$(".questionbox").hide();
	$(".answerbox").hide();
	$(".endbox").hide();

	// declaring audio variables
	var intromusic = document.getElementById("intromusic");
	var gamemusic = document.getElementById("gamemusic");
	var correctsound = document.getElementById("correctsound");
	var incorrectsound = document.getElementById("incorrectsound");

	// declaring initial game variables
	var correct = 0;
	var incorrect = 0;
	var remaining = 30;
	var result = "";
	var timer = "";
	var index = 0;
	var finalscore = 0;
	
	// trivia questions (array of objects)
	var questionSelect = [
		{qheader: "Question One",
		qtext: "What is the name of the hobbit, and where does he live?",
		answer1: "Bilbo Boggins of Bag End",
		answer1value: "incorrect",
		answer2: "Bilbo Baggins of Bag End",
		answer2value: "correct",
		answer3: "Bilbo Baggins of Bog End",
		answer3value: "incorrect",
		atext: "The eponymous hobbit is named Bilbo Baggins, and he lives in Bag End.",
		imagesource: "assets/images/bilborun.gif"},

		{qheader: "Question Two",
		qtext: "Who was the first dwarf to arrive at Bilbo's smial?",
		answer1: "Dwalin",
		answer1value: "correct",
		answer2: "Balin",
		answer2value: "incorrect",
		answer3: "Thorin",
		answer3value: "incorrect",
		atext: "Dwalin was the first dwarf to arrive at Bilbo's smial.",
		imagesource: "assets/images/dwalincookie.gif"},

		{qheader: "Question Three",
		qtext: "Why is Bilbo invited on an adventure?",
		answer1: "Gandalf is allergic to dwarves.",
		answer1value: "incorrect",
		answer2: "Thorin believes a party of fourteen will be unlucky.",
		answer2value: "incorrect",
		answer3: "Smaug is unfamiliar with the scent of hobbits.",
		answer3value: "correct",
		atext: "Smaug is unfamiliar with the scent of hobbits, so Gandalf believes that Bilbo will be able to pass unnoticed in Erebor.",
		imagesource: "assets/images/bilbonope.gif"},

		{qheader: "Question Four",
		qtext: "How did Gandalf acquire the map and key he presents to Thorin?",
		answer1: "He received them from Thrain.",
		answer1value: "correct",
		answer2: "He received them from Thror.",
		answer2value: "incorrect",
		answer3: "He's a wizard, so obviously magic was involved.",
		answer3value: "incorrect",
		atext: "Gandalf received the map and key from Thrain, Thorin's father.",
		imagesource: "assets/images/map.gif"},

		{qheader: "Question Five",
		qtext: "What are the names of the trolls who are turned to stone?",
		answer1: "Bill, Burt, and Tim",
		answer1value: "incorrect",
		answer2: "Bill, Bert, and Tom",
		answer2value: "correct",
		answer3: "Bill, Burt, and Tom",
		answer3value: "incorrect",
		atext: "Bill, Bert, and Tom are the trolls who attempt to eat Bilbo and the dwarves.",
		imagesource: "assets/images/trolls.gif"},

		{qheader: "Question Six",
		qtext: "All of the following characters appear in the films (and not the book) except for...",
		answer1: "Elrond",
		answer1value: "correct",
		answer2: "Galadriel",
		answer2value: "incorrect",
		answer3: "Legolas",
		answer3value: "incorrect",
		atext: "Elrond appears in both the book and films.",
		imagesource: "assets/images/elrond.gif"},

		{qheader: "Question Seven",
		qtext: "Solve the riddle: 'Voiceless it cries / Wingless flutters/ Toothless bites / Mouthless mutters.'",
		answer1: "A river",
		answer1value: "incorrect",
		answer2: "The cold",
		answer2value: "incorrect",
		answer3: "The wind",
		answer3value: "correct",
		atext: "'The wind' is the answer to this riddle posed by Gollum.",
		imagesource: "assets/images/gollum.gif"},

		{qheader: "Question Eight",
		qtext: "Which of the following is not one of Gandalf's official titles?",
		answer1: "Mithrandir",
		answer1value: "incorrect",
		answer2: "The Grey Pilgrim",
		answer2value: "incorrect",
		answer3: "Disturber of the Peace",
		answer3value: "correct",
		atext: "In the Lord of the Rings movies, the hobbits of the Shire have unofficially declared Gandalf a 'Disturber of the Peace,' but this is not one of his official titles.",
		imagesource: "assets/images/gandalf.gif"},

		{qheader: "Question Nine",
		qtext: "Thranduil rides an elk in the films. What is the actor actually riding?",
		answer1: "A horse named Moose.",
		answer1value: "correct",
		answer2: "A moose named Horse.",
		answer2value: "incorrect",
		answer3: "Nothing - the animal is pure CGI.",
		answer3value: "incorrect",
		atext: "Lee Pace, the actor who plays Thranduil, is riding a horse named Moose.",
		imagesource: "assets/images/moose.gif"},

		{qheader: "Question Ten",
		qtext: "Which of the following actors from The Hobbit films has not previously acted as Sherlock Holmes?",
		answer1: "Sir Ian McKellen",
		answer1value: "incorrect",
		answer2: "Benedict Cumberbun",
		answer2value: "correct",
		answer3: "Sir Christopher Lee",
		answer3value: "incorrect",
		atext: "Benedict CumberBUN is not an actor in The Hobbit films. That would be Benedict CumberBATCH, who voiced Smaug and also previously acted as Sherlock Holmes in the 2010 BBC television series.",
		imagesource: "assets/images/benedict.gif"}
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
		
		// run game
		question(index);
		selectAnswer();
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

	// end the game and reset variables
	function endGame() {
		updateScreen();
		$(".answerbox").fadeOut(1500);
		$(".endbox").delay(1500).fadeIn(1500);

		// reset variables begin new game
		$("#restartgame").on("click", function() {
			$(".endbox").fadeOut(1500);
			correct = 0;
			incorrect = 0;
			remaining = 30;
			result = "";
			timer = "";
			index = 0;
			finalscore = 0;
			question(index);
		});
	}

	// prepare to load next question
	function nextQuestion() {
		$(".answerbox").fadeOut(1500);
		remaining = 30;
		index++;

		if (index == questionSelect.length) {
			endGame();
		} else {
			question(index);
		}
	}

	// question logic
	function question(X) {
		timer = setInterval(countDown, 1000);
		$(".questionbox").delay(1500).fadeIn(1500);

		// update question and answer text and apply values to answers
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
		$(".correct").text(correct);
		$(".incorrect").text(incorrect);
		$(".remaining").text(remaining);
		$("#result").text(result);

		finalscore = correct * 5;
		$("#finalscore").text(finalscore);
	}

	function selectAnswer() {
		// user selects an answer
		$(".answer").on("click", function() {
			var userAnswer = $(this).val();
			$(".questionbox").fadeOut(1000);
			$("#answerpic").removeAttr("src").attr("src", questionSelect[index].imagesource);
			$(".answerbox").delay(1000).fadeIn(1000);

			if (userAnswer == "correct") {
				correct++;
				result = "Correct!"
				correctsound.play();
				$("#atext").text(questionSelect[index].atext);
				clearInterval(timer);
				updateScreen();
				setTimeout(nextQuestion, 5000);
			} else if (userAnswer == "incorrect") {
				incorrect++;
				result = "Incorrect!"
				incorrectsound.play();
				$("#atext").text(questionSelect[index].atext);
				clearInterval(timer);
				updateScreen();
				setTimeout(nextQuestion, 5000);
			} else {
				alert("Oops! Looks like you misclicked! Please try again.");
			}
		}); 
	}

}); 