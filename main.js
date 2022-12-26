var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
document.getElementById("startreset").onclick = function () {
    if (playing == true) {
        location.reload();
    } else {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        hide("gameover");
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        document.getElementById("startreset").innerHTML = "Reset Game";

        startCountDown();
        generateQA();
    }
};

function startCountDown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountDown();
            show("gameover");
            document.getElementById("gameover").innerHTML =
                "<p>Game Over</p><p>Your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountDown() {
    clearInterval(action);
}

function hide(ID) {
    document.getElementById(ID).style.display = "none";
}

function show(ID) {
    document.getElementById(ID).style.display = "block";
}

function generateQA() {
    var answers = [];
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    answers = [correctAnswer];
    for (var i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer =
                    (1 + Math.round(9 * Math.random())) *
                    (1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

for (var i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                timeremaining = 60;
                startCountDown();
                generateQA();
            } else {
                document.getElementById("scorevalue").innerHTML = score;
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    };
}
