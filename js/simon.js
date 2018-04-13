"use strict";

//create variables that will be
var pattern = [];
var userPattern = [];
var level = 0;
var gameCheck = false;
function addPattern() {
    var pValue = randNum(0, 3);

    // pushed a random sequence to array  creating a global variable
    pattern.push(pValue);
}

function playPattern() {
//   takes the pat
    for (var i = 0; i < pattern.length; i++){
        var delayTime = i * 600;

        setTimeout(flashSquare,delayTime);
    }

}

function flashSquare() {
    var item = pattern.pop();
    gameCheck = true;

//    pops and removes first item of the array
    $('#' + item).animate({
        opacity: 0.2
    }, 200).animate({
        opacity: 1
    }, 100);

    userPattern.push(item);

    if(pattern.length <= 0){
        createClicks();
    }
}
//end of flash square function


function createClicks() {
    $('.square').click(function() {
        //    check if clicked element is the correct square
        var item = userPattern.shift();

        var squareId = $(this).attr('id');

        $(this).animate({opacity:.2}, 200).animate({opacity: 1}, 100);

        if (item == squareId){
            pattern.push(item);
            if (userPattern.length <= 0){
                level++;
                $('#level').html('Level: ' + level);
                switch (level){
                    case 1:
                        $('#title').html("Good Job!").css({
                            fontSize: 45,
                            marginBottom: 15,
                            paddingTop: 75
                        });
                        break;
                    case 2:
                        $('#title').html("Awesome!").css({
                            fontSize: 45,
                            marginBottom: 15,
                            paddingTop: 75
                        });
                        break;
                    case 4:
                        $('#title').html("Legit!").css({
                            fontSize: 45,
                            marginBottom: 15,
                            paddingTop: 75
                        });
                        break;
                    case 6:
                        $('#title').html("Arrogant!").css({
                            fontSize: 45,
                            marginBottom: 15,
                            paddingTop: 75
                        });
                        break;
                    case 8:
                        $('#title').html("Just stop now!").css({
                            fontSize: 36,
                            marginBottom: 15,
                            paddingTop: 75
                        });
                }

                removeClicks();
                //    user is finished clicking through the pattern successfully

                //    add a new pattern
                addPattern();
                //playPattern();
                setTimeout(playPattern, 800);
            }

        } else {
            // else game over
            gameCheck = false;
            $('#title').html('GAME OVER').css({
                fontSize: 50,
                marginBottom: 15,
                paddingTop: 15
            });
            $('p').html("Click to Restart");
            //clear out the pattern arrays
            pattern = [];
            usedPattern = [];

        }

    }); //end .square click
} //end create click
function removeClicks(){
//    removes all events from element
    $('.square').unbind();
}


function startGame(){
    removeClicks();
    resetGame();
    addPattern();
    addPattern();
    playPattern();
}

function resetGame(){
    level = 0;
    $('#level').html('Level: ' + level);
    $('#title').html('Simon').css({
        fontSize: 82,
        marginBottom: 0,
        paddingTop: 0
    });
    $('p').html("Don't blink");
    // $('#stats-circle').click(fun)
}

$('#stats-circle').click(function () {
    if(gameCheck === false){
        startGame();
    }
});

function randNum(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
