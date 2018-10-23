$(function () {
    $("#restart").hide();
    $("#boxes").show();
        $("#questions").show();
        $("#start").show();
    var bank = [{
            question: "What is Spider-Man's real name?",
            answers: ["Bruce Wayne", "Clark Kent", "Peter Parker", "Tony Stark"],
            correct: 2
        },

        {
            question: "Which character bullied Peter Parker in high school?",
            answers: ["Biff Tannen", "Flash Thompson", "Robbie Robertson", "J. Jonah Jameson"],
            correct: 1
        },
        {
            question: "What color is Mary Jane Watson's hair?",
            answers: ["Brown", "Blonde", "Black", "Red"],
            correct: 3
        },
        {
            question: "What was the name of Peter Parker's uncle?",
            answers: ["Ben", "Bruce", "Thomas", "Andy"],
            correct: 0
        },
        {
            question: "How old was Peter Parker when he became Spider-Man?",
            answers: [" 15 ", " 16 ", " 17 ", " 18 "],
            correct: 0
        }
    ];

    var unanswered = 0;
    var newArray = [];

    var index = 0;
    var pick;
    var bankAttempt = bank.length;
    var winner = 0;
    var wrong = 0;
    var timeLeft = 30;
    var userGuess = "";
    var timerId;

    $("#start").on("click", function () {
        $("#start").hide();
        $("#boxes").show();
        $("#questions").show();
        startGame();
        startTime();
        

    })
//still working on gettting the restart button to work....

    // $("#restart").on("click", function() {
    //     $("#restart").hide();
    //     $("#boxes").empty();
    //     $("#questions").empty();
    //     $("#start").show();
    //     startGame();
    // })

    function startTime() {
        endGame();
        timerId = setInterval(decrement, 1000);
        timeLeft = 30;

    }

    function decrement() {
        timeLeft--;
        $("#timer").html("<h2>" + timeLeft + "</h2>");
        if (timeLeft === 0) {
            unanswered++;
            endGame();

        }
    }

    function endGame() {
        clearInterval(timerId);

    }
    
//function to start the game
    function startGame() {
        

        index = Math.floor(Math.random() * bank.length);
        pick = bank[index];

        $("#boxes").empty()
        $("#questions").html("<h2>" + pick.question + "</h2>");

        console.log(bank[index]);
        for (var i = 0; i < pick.answers.length; i++) {
            console.log(pick.answers[i]);

            var userChoice = $("<button>" + pick.answers[i] + "</button>").on("click", function () {
                userGuess = parseInt($(this).attr("data-guessvalue"));

                console.log(userGuess);
                if (userGuess === pick.correct) {
                    stop();
                    winner++;
                    userGuess = "";
                    $("#boxes").html("<p><strong> Excelsior!!! A Job Well Done!</strong></p>");
                    newRound();
                    console.log(winner);
                } else {
                    stop();
                    wrong++;
                    userGuess = "";
                    $("#boxes").html("<p><strong>So Close, but not Enough,Try Again!!</strong></p>");
                    newRound();
                    console.log(wrong);

                }
            })

            // userChoice.addClass("answerchoice");
            userChoice.attr("data-guessvalue", i)

            $("#boxes").append(userChoice);
            console.log(userChoice);
        };

    }

    function newRound() {
        newArray.push(pick);
        bank.splice(index, 1);

        finalize = setTimeout(function () {

            if ((wrong + winner + unanswered) === bankAttempt) {
                $("#questions").empty();
                $("#questions").html("<h3>Game Over!  Check out the results: </h3>");
                $("#boxes").append("<h4> Correct: " + winner + "</h4>");
                $("#boxes").append("<h4> Incorrect: " + wrong + "</h4>");
                
                $("p").hide();
                $("button").hide();
                $(".label").hide();
                $("#timer").hide();
                // $("#restart").show();
                winner = 0;
                wrong = 0;
                unanswered = 0;
                endGame();
            } else {

                startGame();

            }
        }, 2000);
    }
    

});